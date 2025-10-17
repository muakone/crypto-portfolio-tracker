<template>
  <div class="min-h-screen px-6 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard"
          class="text-gray-400 hover:text-white mb-4 inline-block"
        >
          ← Back to Dashboard
        </NuxtLink>
        <h1 class="text-4xl font-bold mb-2">Transaction History</h1>
        <p class="text-gray-400">View all your crypto transactions</p>
      </div>

      <!-- Filters -->
      <div
        class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Wallet Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Wallet
            </label>
            <select
              v-model="selectedWallet"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Wallets</option>
              <option
                v-for="wallet in wallets"
                :key="wallet.id"
                :value="wallet.id"
              >
                {{ formatAddress(wallet.address) }} ({{ wallet.chain }})
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Type
            </label>
            <select
              v-model="selectedType"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Transactions</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="refreshTransactions"
              :disabled="loading"
              class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Icon
                name="mdi:refresh"
                class="h-5 w-5"
                :class="{ 'animate-spin': loading }"
              />
              {{ loading ? "Loading..." : "Refresh" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div
        class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden"
      >
        <!-- Loading State -->
        <div v-if="loading" class="px-6 py-24 text-center">
          <Icon
            name="mdi:loading"
            class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
          />
          <p class="text-gray-400">Loading transactions...</p>
        </div>

        <!-- Transactions List -->
        <div v-else-if="filteredTransactions.length > 0">
          <div class="overflow-x-auto scrollbar-hide">
            <table class="w-full min-w-[800px]">
              <thead>
                <tr class="border-b border-white/10">
                  <th
                    class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Hash
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    From/To
                  </th>
                  <th
                    class="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500"
                  >
                    Time
                  </th>
                  <th
                    class="px-6 py-4 text-center text-xs font-medium uppercase text-gray-500"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr
                  v-for="tx in paginatedTransactions"
                  :key="tx.hash"
                  class="hover:bg-white/5 transition-colors"
                >
                  <!-- Type -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div
                        :class="[
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm',
                          tx.isOutgoing
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-green-500/20 text-green-400',
                        ]"
                      >
                        {{ tx.isOutgoing ? "↑" : "↓" }}
                      </div>
                      <span class="text-sm text-gray-300">
                        {{ tx.isOutgoing ? "Sent" : "Received" }}
                      </span>
                    </div>
                  </td>

                  <!-- Hash -->
                  <td class="px-6 py-4">
                    <a
                      :href="getExplorerLink(tx)"
                      target="_blank"
                      class="text-sm text-blue-400 hover:text-blue-300 font-mono"
                    >
                      {{ formatHash(tx.hash) }}
                    </a>
                  </td>

                  <!-- From/To -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-300 font-mono">
                      {{ formatAddress(tx.isOutgoing ? tx.to : tx.from) }}
                    </div>
                  </td>

                  <!-- Amount -->
                  <td class="px-6 py-4 text-right">
                    <div
                      :class="[
                        'text-sm font-semibold',
                        tx.isOutgoing ? 'text-red-400' : 'text-green-400',
                      ]"
                    >
                      {{ tx.isOutgoing ? "-" : "+" }}{{ tx.value.toFixed(6) }}
                      <span class="text-gray-500">{{ tx.type }}</span>
                    </div>
                  </td>

                  <!-- Time -->
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm text-gray-400">
                      {{ formatFullTime(tx.timestamp) }}
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4 text-center">
                    <span
                      v-if="!tx.isError"
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full bg-green-400"
                      ></span>
                      Success
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                      Failed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            class="flex items-center justify-between px-6 py-4 border-t border-white/10"
          >
            <div class="text-sm text-gray-400">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{
                Math.min(
                  currentPage * itemsPerPage,
                  filteredTransactions.length
                )
              }}
              of {{ filteredTransactions.length }} transactions
            </div>
            <div class="flex gap-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
              >
                Previous
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage >= totalPages"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="px-6 py-24 text-center">
          <Icon
            name="mdi:file-document-outline"
            class="h-16 w-16 mx-auto mb-4 text-gray-600"
          />
          <h3 class="text-2xl font-semibold text-white mb-2">
            No Transactions Found
          </h3>
          <p class="text-gray-400">
            No transactions match your current filters
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

definePageMeta({
  layout: "dashboard",
});

const { getUser, getWallets } = useSupabase();
const { getTransactionHistory } = useWallet();

const user = ref<User | null>(null);
const wallets = ref<any[]>([]);
const transactions = ref<any[]>([]);
const loading = ref(true);
const selectedWallet = ref("all");
const selectedType = ref("all");
const currentPage = ref(1);
const itemsPerPage = 20;

// Filtered transactions
const filteredTransactions = computed(() => {
  let filtered = transactions.value;

  // Filter by wallet
  if (selectedWallet.value !== "all") {
    const wallet = wallets.value.find((w) => w.id === selectedWallet.value);
    if (wallet) {
      filtered = filtered.filter(
        (tx) =>
          tx.from.toLowerCase() === wallet.address.toLowerCase() ||
          tx.to.toLowerCase() === wallet.address.toLowerCase()
      );
    }
  }

  // Filter by type
  if (selectedType.value !== "all") {
    filtered = filtered.filter((tx) => {
      if (selectedType.value === "sent") return tx.isOutgoing;
      if (selectedType.value === "received") return !tx.isOutgoing;
      return true;
    });
  }

  return filtered;
});

// Paginated transactions
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage)
);

// Load transactions
const loadTransactions = async () => {
  loading.value = true;

  try {
    const currentUser = await getUser();
    if (!currentUser) {
      navigateTo("/login");
      return;
    }

    user.value = currentUser;

    // Get all wallets
    const { data: walletsData } = await getWallets(currentUser.id);
    if (walletsData) {
      wallets.value = walletsData;

      // Fetch transactions for all wallets
      const allTransactions = [];
      for (const wallet of walletsData) {
        const txs = await getTransactionHistory(
          wallet.address,
          wallet.chain,
          100
        );

        // Add wallet info and determine direction
        const txsWithInfo = txs.map((tx: any) => ({
          ...tx,
          walletId: wallet.id,
          walletAddress: wallet.address,
          isOutgoing: tx.from.toLowerCase() === wallet.address.toLowerCase(),
        }));

        allTransactions.push(...txsWithInfo);
      }

      // Sort by timestamp (newest first)
      transactions.value = allTransactions.sort(
        (a, b) => b.timestamp - a.timestamp
      );
    }
  } catch (err) {
    console.error("Error loading transactions:", err);
  } finally {
    loading.value = false;
  }
};

const refreshTransactions = () => {
  currentPage.value = 1;
  loadTransactions();
};

// Format functions
const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatHash = (hash: string): string => {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

const formatFullTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getExplorerLink = (tx: any): string => {
  if (tx.type === "ETH") {
    return `https://etherscan.io/tx/${tx.hash}`;
  } else if (tx.type === "BTC") {
    return `https://www.blockchain.com/btc/tx/${tx.hash}`;
  }
  return "#";
};

onMounted(() => {
  loadTransactions();
});

useHead({
  title: "Transaction History",
});
</script>
