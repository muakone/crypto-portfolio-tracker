<template>
  <section class="glass-card rounded-3xl p-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="section-title">Holdings</p>
        <h2 class="mt-2 text-lg sm:text-2xl font-semibold text-white">
          Your Assets
        </h2>
        <p class="mt-2 text-xs text-slate-400">
          Live balances sourced from CoinGecko pricing and synced wallets.
        </p>
      </div>
      <div class="flex gap-2 text-xs">
        <button
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-gray-300 transition-colors hover:border-indigo-400/60 hover:text-white"
        >
          <Icon name="mdi:sort-variant" class="h-4 w-4" />
          Sort by Value
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-gray-300 transition-colors hover:border-teal-400/60 hover:text-white"
        >
          <Icon name="mdi:filter" class="h-4 w-4" />
          Stablecoins
        </button>
      </div>
    </div>

    <div v-if="!tokens || tokens.length === 0" class="py-12 text-center">
      <div class="mb-4 text-slate-300">
        <Icon name="mdi:wallet-outline" class="h-16 w-16" />
      </div>
      <p class="mb-2 text-gray-400">No tokens found</p>
      <p class="text-sm text-gray-500">
        Connect a wallet to see live balances and allocation
      </p>
    </div>

    <div v-else class="mt-6 overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr
            class="border-b border-white/10 text-left text-xs uppercase text-gray-500"
          >
            <th class="py-2 pl-2 pr-3 sm:py-3 sm:pl-4 sm:pr-6 font-medium">
              Asset
            </th>
            <th class="py-2 px-3 sm:py-3 sm:px-6 text-right font-medium">
              Balance
            </th>
            <th class="py-2 px-3 sm:py-3 sm:px-6 text-right font-medium">
              Value (USD)
            </th>
            <th
              class="py-2 pl-3 pr-2 sm:py-3 sm:pl-6 sm:pr-4 text-right font-medium"
            >
              Allocation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(token, index) in sortedTokens"
            :key="`${token.symbol}-${index}`"
            class="border-b border-white/5 transition-colors hover:bg-white/5"
          >
            <td class="py-3 pl-2 pr-3 sm:py-4 sm:pl-4 sm:pr-6">
              <div class="flex items-center gap-3">
                <span
                  class="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/40 to-sky-500/40 text-base sm:text-lg"
                >
                  <Icon
                    :name="getTokenIconName(token.symbol)"
                    class="h-4 w-4 sm:h-5 sm:w-5 text-white"
                  />
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm sm:text-base font-semibold text-white">
                      {{ token.symbol }}
                    </span>
                    <span class="badge-soft text-[0.6rem] text-gray-300">
                      Top {{ index + 1 }}
                    </span>
                  </div>
                  <div
                    class="mt-2 h-1.5 w-32 sm:w-40 overflow-hidden rounded-full bg-slate-800"
                  >
                    <span
                      class="block h-full rounded-full bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-400"
                      :style="{ width: allocationWidth(token.percentage) }"
                    />
                  </div>
                </div>
              </div>
            </td>
            <td
              class="py-3 px-3 sm:py-4 sm:px-6 text-right text-xs sm:text-sm text-gray-300"
            >
              {{ formatBalance(token.balance) }}
            </td>
            <td
              class="py-3 px-3 sm:py-4 sm:px-6 text-right text-xs sm:text-sm font-semibold text-white"
            >
              {{ formatCurrency(token.usd_value) }}
            </td>
            <td
              class="py-3 pl-3 pr-2 sm:py-4 sm:pl-6 sm:pr-4 text-right text-xs sm:text-sm text-gray-300"
            >
              {{ formatPercentage(token.percentage) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  formatBalance,
  formatCurrency,
  formatPercentage,
} from "~/utils/format";
import type { TokenRecord } from "~~/shared/types";

type TokenWithPercentage = TokenRecord & { percentage: number };

const props = defineProps<{ tokens: TokenRecord[] }>();

// Sort tokens by USD value
const sortedTokens = computed<TokenWithPercentage[]>(() => {
  if (!props.tokens) {
    return [];
  }

  const total = props.tokens.reduce(
    (sum: number, token: TokenRecord) => sum + (token.usd_value || 0),
    0
  );

  return [...props.tokens]
    .map((token: TokenRecord) => ({
      ...token,
      percentage: total > 0 ? (token.usd_value / total) * 100 : 0,
    }))
    .sort(
      (a: TokenWithPercentage, b: TokenWithPercentage) =>
        b.usd_value - a.usd_value
    );
});

const iconMap: Record<string, string> = {
  BTC: "cryptocurrency:btc",
  ETH: "cryptocurrency:eth",
  USDT: "cryptocurrency:usdt",
  USDC: "cryptocurrency:usdc",
  BNB: "cryptocurrency:bnb",
  ADA: "cryptocurrency:ada",
  SOL: "cryptocurrency:sol",
  DOT: "cryptocurrency:dot",
  MATIC: "cryptocurrency:matic",
  LINK: "cryptocurrency:link",
  AVAX: "cryptocurrency:avax",
  DOGE: "cryptocurrency:doge",
  SHIB: "cryptocurrency:shib",
};

const getTokenIconName = (symbol: string) => {
  const upper = symbol?.toUpperCase() ?? "";
  return iconMap[upper] || "mdi:currency-usd-circle";
};

const allocationWidth = (percentage: number) => {
  if (!percentage) {
    return "4%";
  }
  const clamped = Math.min(Math.max(percentage, 4), 100);
  return `${clamped.toFixed(2)}%`;
};
</script>
