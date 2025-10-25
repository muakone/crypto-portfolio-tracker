<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div
      class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
    >
      <p class="text-gray-400 text-sm mb-2">Total Value</p>
      <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
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
      <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
        {{ tokensCount }}
      </p>
      <p class="text-sm text-gray-500 mt-2">
        Across {{ walletsCount }} wallet{{ walletsCount !== 1 ? "s" : "" }}
      </p>
    </div>

    <div
      class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
    >
      <p class="text-gray-400 text-sm mb-2">Top Asset</p>
      <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
        {{ topAsset?.symbol || "N/A" }}
      </p>
      <p class="text-sm text-gray-400 mt-2">
        {{ formatCurrency(topAsset?.usd_value || 0) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TokenRecord } from "~~/shared/types";
import { formatCurrency } from "~/utils/format";

const props = withDefaults(
  defineProps<{
    totalValue: number;
    tokensCount: number;
    walletsCount: number;
    topAsset?: TokenRecord | null;
    total24hChange: number;
  }>(),
  {
    totalValue: 0,
    tokensCount: 0,
    walletsCount: 0,
    topAsset: null,
    total24hChange: 0,
  }
);

const { totalValue, tokensCount, walletsCount, topAsset, total24hChange } =
  props;
</script>
