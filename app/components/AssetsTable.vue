<template>
  <div>
    <!-- Assets Table -->
    <div
      v-if="tokens && tokens.length > 0"
      class="overflow-x-auto scrollbar-hide"
    >
      <table
        class="w-full"
        :class="collapsed ? 'min-w-[600px]' : 'min-w-[800px]'"
      >
        <thead>
          <tr class="border-b border-white/5">
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
            >
              Name
            </th>
            <th
              v-if="collapsed"
              class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
            >
              Price
            </th>
            <th
              v-if="collapsed"
              class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
            >
              Total
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap"
            >
              24H
            </th>
            <th class="px-6 py-3" />
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="token in tokens"
            :key="token.id"
            class="transition-colors hover:bg-white/5"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xl flex-shrink-0"
                >
                  {{ getTokenIcon(token.symbol) }}
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-white truncate">
                    {{ token.name || token.symbol }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ token.symbol?.toUpperCase() }}
                  </p>
                </div>
              </div>
            </td>
            <td v-if="collapsed" class="px-6 py-4 text-right">
              <p class="text-sm font-medium text-white">
                {{ formatCurrency(token.price || 0) }}
              </p>
            </td>
            <td v-if="collapsed" class="px-6 py-4 text-right">
              <p class="text-sm text-gray-300">
                {{ formatAmount(token.balance || 0) }}
              </p>
            </td>
            <td class="px-6 py-4 text-right">
              <p class="text-sm font-semibold text-white">
                {{ formatCurrency(token.usd_value || 0) }}
              </p>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="inline-flex flex-col items-end">
                <span
                  class="text-sm font-semibold"
                  :class="
                    (token.change_24h || 0) >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  "
                >
                  {{ (token.change_24h || 0) >= 0 ? "+" : ""
                  }}{{ (token.change_24h || 0).toFixed(2) }}%
                </span>
                <span v-if="collapsed" class="text-xs text-gray-500">
                  {{ formatCurrency(Math.abs(token.change_24h_value || 0)) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:dots-vertical" class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="px-6 py-16 text-center">
      <div class="flex items-center justify-center flex-col">
        <Icon
          name="mdi:chart-box-outline"
          class="h-16 w-16 text-gray-500 mb-4"
        />
        <h3 class="text-xl font-semibold text-white mb-2">No Assets Yet</h3>
        <p class="text-gray-400 mb-6">
          Add your first wallet to start tracking your crypto portfolio
        </p>
        <NuxtLink
          to="/add-wallet"
          class="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
        >
          <Icon name="mdi:plus" class="h-5 w-5 mr-2" />
          Add Wallet
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatAmount } from "~/utils/format";

interface Token {
  id?: string;
  symbol: string;
  name?: string;
  balance: number;
  price: number;
  usd_value: number;
  change_24h?: number;
  change_24h_value?: number;
}

interface Props {
  tokens: Token[];
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
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
</script>
