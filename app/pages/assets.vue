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
        <h1 class="text-4xl font-bold mb-2">All Assets</h1>
        <p class="text-gray-400">Manage your crypto portfolio</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
        >
          <p class="text-gray-400 text-sm mb-2">Total Value</p>
          <p class="text-3xl font-bold text-white">
            {{ formatCurrency(totalValue) }}
          </p>
          <p
            :class="[
              'text-sm mt-2',
              total24hChange >= 0 ? 'text-green-400' : 'text-red-400',
            ]"
          >
            {{ total24hChange >= 0 ? "+" : "" }}{{ total24hChange.toFixed(2) }}%
            <span class="text-gray-500">24h</span>
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
        >
          <p class="text-gray-400 text-sm mb-2">Total Assets</p>
          <p class="text-3xl font-bold text-white">{{ tokens.length }}</p>
          <p class="text-sm text-gray-500 mt-2">
            Across {{ wallets.length }} wallet{{
              wallets.length !== 1 ? "s" : ""
            }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
        >
          <p class="text-gray-400 text-sm mb-2">Top Asset</p>
          <p class="text-3xl font-bold text-white">
            {{ topAsset?.symbol || "N/A" }}
          </p>
          <p class="text-sm text-gray-400 mt-2">
            {{ formatCurrency(topAsset?.usd_value || 0) }}
          </p>
        </div>
      </div>

      <!-- Assets Table -->
      <div
        class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden"
      >
        <div
          class="flex items-center justify-between border-b border-white/10 px-6 py-4"
        >
          <h3 class="text-lg font-semibold text-white">Your Assets</h3>
          <button
            @click="refresh"
            :disabled="loading"
            class="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
          >
            <Icon
              name="mdi:refresh"
              class="h-4 w-4"
              :class="{ 'animate-spin': loading }"
            />
            {{ loading ? "Refreshing..." : "Refresh" }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="px-6 py-24 text-center">
          <Icon
            name="mdi:loading"
            class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
          />
          <p class="text-gray-400">Loading assets...</p>
        </div>

        <!-- Assets List -->
        <div
          v-else-if="tokens.length > 0"
          class="overflow-x-auto scrollbar-hide"
        >
          <table class="w-full min-w-[900px]">
            <thead>
              <tr class="border-b border-white/5">
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  Asset
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  Balance
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  Value
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  24H Change
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
                >
                  Allocation
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr
                v-for="token in sortedTokens"
                :key="token.id"
                class="hover:bg-white/5 transition-colors"
              >
                <!-- Asset -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xl"
                    >
                      {{ getTokenIcon(token.symbol) }}
                    </div>
                    <div>
                      <p class="font-semibold text-white">{{ token.name }}</p>
                      <p class="text-xs text-gray-500">{{ token.symbol }}</p>
                    </div>
                  </div>
                </td>

                <!-- Price -->
                <td class="px-6 py-4 text-right">
                  <p class="text-sm font-medium text-white">
                    {{ formatCurrency(token.price || 0) }}
                  </p>
                </td>

                <!-- Balance -->
                <td class="px-6 py-4 text-right">
                  <p class="text-sm text-gray-300">
                    {{ formatAmount(token.balance || 0) }}
                  </p>
                </td>

                <!-- Value -->
                <td class="px-6 py-4 text-right">
                  <p class="text-sm font-semibold text-white">
                    {{ formatCurrency(token.usd_value || 0) }}
                  </p>
                </td>

                <!-- 24H Change -->
                <td class="px-6 py-4 text-right">
                  <div class="inline-flex flex-col items-end">
                    <span
                      :class="[
                        'text-sm font-semibold',
                        (token.change_24h || 0) >= 0
                          ? 'text-green-400'
                          : 'text-red-400',
                      ]"
                    >
                      {{ (token.change_24h || 0) >= 0 ? "+" : ""
                      }}{{ (token.change_24h || 0).toFixed(2) }}%
                    </span>
                    <span class="text-xs text-gray-500">
                      {{
                        formatCurrency(Math.abs(token.change_24h_value || 0))
                      }}
                    </span>
                  </div>
                </td>

                <!-- Allocation -->
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <div
                      class="w-16 h-2 bg-white/10 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        :style="{ width: `${getAllocation(token.usd_value)}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-400 w-12">
                      {{ getAllocation(token.usd_value).toFixed(1) }}%
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="px-6 py-24 text-center">
          <Icon
            name="mdi:wallet-outline"
            class="h-16 w-16 mx-auto mb-4 text-gray-600"
          />
          <h3 class="text-2xl font-semibold text-white mb-2">No Assets Yet</h3>
          <p class="text-gray-400 mb-6">
            Add your first wallet to start tracking
          </p>
          <NuxtLink
            to="/add-wallet"
            class="inline-flex px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
          >
            + Add Wallet
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatAmount } from "~/utils/format";

definePageMeta({
  layout: "dashboard",
});

const { getUser } = useSupabase();
const { refreshPortfolio, tokens, totalValue, loading } = usePortfolio();

const user = ref(null);
const wallets = ref<any[]>([]);

// Computed values
const sortedTokens = computed(() => {
  return [...tokens.value].sort(
    (a, b) => (b.usd_value || 0) - (a.usd_value || 0)
  );
});

const topAsset = computed(() => sortedTokens.value[0]);

const total24hChange = computed(() => {
  if (tokens.value.length === 0) return 0;
  const totalChangeValue = tokens.value.reduce(
    (sum, token) => sum + (token.change_24h_value || 0),
    0
  );
  return totalValue.value > 0 ? (totalChangeValue / totalValue.value) * 100 : 0;
});

// Token icon mapping
const getTokenIcon = (symbol: string): string => {
  const icons: Record<string, string> = {
    BTC: "₿",
    ETH: "Ξ",
    USDT: "₮",
    BNB: "◆",
    SOL: "◎",
    XRP: "✕",
    ADA: "₳",
    DOGE: "Ð",
    DOT: "●",
    MATIC: "◇",
  };
  return icons[symbol?.toUpperCase()] || "◆";
};

// Get allocation percentage
const getAllocation = (value: number): number => {
  return totalValue.value > 0 ? (value / totalValue.value) * 100 : 0;
};

// Refresh portfolio
const refresh = async () => {
  if (user.value) {
    await refreshPortfolio((user.value as any).id);
  }
};

onMounted(async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    navigateTo("/login");
    return;
  }

  user.value = currentUser as any;
  await refreshPortfolio(currentUser.id);

  // Get wallets count
  const { getWallets } = useSupabase();
  const { data } = await getWallets(currentUser.id);
  if (data) wallets.value = data;
});

useHead({
  title: "All Assets",
});
</script>
