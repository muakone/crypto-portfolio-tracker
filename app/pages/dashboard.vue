<template>
  <div class="min-h-screen">
    <!-- Top Header with Action Buttons -->
    <DashboardHeader />

    <!-- Main Content -->
    <div class="px-6 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="py-24 text-center text-gray-400">
        <Icon
          name="mdi:loading"
          class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
        />
        <p>Loading your portfolio…</p>
      </div>

      <!-- Logged In - Dashboard Content -->
      <div v-else-if="user">
        <!-- Total Worth Section -->
        <PortfolioWorth
          :total-value="displayTotalValue"
          :change="totalChange"
          :change-amount="totalChangeAmount"
          :loading="portfolioLoading"
          :last-sync-time="lastSync"
          @refresh="refresh"
        />

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <!-- Left Column: Portfolio Chart -->
          <div class="xl:col-span-4">
            <div
              class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 h-full"
            >
              <PortfolioChart :distribution="dummyDistribution" />
            </div>
          </div>

          <!-- Right Column: Assets Table -->
          <div class="xl:col-span-8">
            <div
              class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden"
            >
              <div
                class="flex items-center justify-between border-b border-white/10 px-6 py-4"
              >
                <h3 class="text-lg font-semibold text-white">Your Assets</h3>
                <div class="flex items-center gap-3">
                  <NuxtLink
                    to="/add-wallet"
                    class="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
                  >
                    <Icon name="mdi:plus" class="h-4 w-4" />
                    Add Wallet
                  </NuxtLink>
                  <NuxtLink
                    to="/assets"
                    class="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    See More
                    <Icon name="mdi:arrow-right" class="h-4 w-4" />
                  </NuxtLink>
                </div>
              </div>
              <div class="overflow-x-auto scrollbar-hide">
                <AssetsTable
                  :tokens="displayTokens"
                  :collapsed="isSidebarCollapsed"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="mt-6">
          <TransactionHistory
            :transactions="transactions"
            :loading="txLoading"
            :limit="5"
            :wallet-address="primaryWalletAddress"
          />
        </div>
      </div>

      <!-- Not Logged In -->
      <div v-else class="py-16 text-center">
        <div
          class="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/40 p-12 backdrop-blur-xl"
        >
          <Icon
            name="mdi:lock-outline"
            class="h-16 w-16 mx-auto mb-4 text-gray-500"
          />
          <h2 class="text-2xl font-semibold text-white">Please Login</h2>
          <p class="mt-3 text-sm text-gray-400">
            You need to be logged in to view your portfolio.
          </p>
          <NuxtLink
            to="/login"
            class="mt-6 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
          >
            Go to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { getUser, getWallets } = useSupabase();
const {
  refreshPortfolio,
  loading: portfolioLoading,
  tokens,
  totalValue,
  distribution,
} = usePortfolio();
const { getTransactionHistory } = useWallet();

const user = ref<User | null>(null);
const loading = ref(true);
const lastSync = ref(new Date());
const transactions = ref<any[]>([]);
const txLoading = ref(false);
const primaryWalletAddress = ref<string>("");
const isSidebarCollapsed = ref(false);

// Use real portfolio data - LIMIT TO TOP 5 for dashboard
const displayTokens = computed(() => {
  // Sort by USD value (highest first) and take top 5
  return [...tokens.value]
    .sort((a, b) => (b.usd_value || 0) - (a.usd_value || 0))
    .slice(0, 5);
});
const displayTotalValue = computed(() => totalValue.value);
const dummyDistribution = computed(() => distribution.value);

// Calculate total 24h change from real data
const totalChange = computed(() => {
  if (tokens.value.length === 0) return 0;
  const totalChangeValue = tokens.value.reduce(
    (sum, token) => sum + (token.change_24h_value || 0),
    0
  );
  const total = totalValue.value;
  return total > 0 ? (totalChangeValue / total) * 100 : 0;
});

const totalChangeAmount = computed(() => {
  return tokens.value.reduce(
    (sum, token) => sum + (token.change_24h_value || 0),
    0
  );
});

// Load transaction history
const loadTransactions = async () => {
  if (!user.value) return;

  txLoading.value = true;
  try {
    const { data: wallets } = await getWallets(user.value.id);
    if (!wallets || wallets.length === 0) return;

    // Set primary wallet address for the component
    primaryWalletAddress.value = wallets[0].address;

    // Fetch transactions for all wallets
    const allTxs = [];
    for (const wallet of wallets) {
      const txs = await getTransactionHistory(wallet.address, wallet.chain, 20);
      allTxs.push(...txs);
    }

    // Sort by timestamp (newest first)
    transactions.value = allTxs.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Error loading transactions:", error);
  } finally {
    txLoading.value = false;
  }
};

onMounted(async () => {
  // Watch for sidebar collapse state
  const updateCollapsedState = () => {
    isSidebarCollapsed.value =
      localStorage.getItem("sidebarCollapsed") === "true";
  };

  updateCollapsedState();

  // Poll for changes
  const interval = setInterval(updateCollapsedState, 100);

  onUnmounted(() => {
    clearInterval(interval);
  });

  loading.value = true;
  user.value = await getUser();

  const currentUser = user.value;
  if (currentUser) {
    await refreshPortfolio(currentUser.id);
    lastSync.value = new Date();

    // Load transactions
    await loadTransactions();
  }

  loading.value = false;
});

const refresh = async () => {
  const currentUser = user.value;
  if (currentUser) {
    await refreshPortfolio(currentUser.id);
    lastSync.value = new Date();

    // Also refresh transactions
    await loadTransactions();
  }
};

useHead({
  title: "Dashboard",
});
</script>
