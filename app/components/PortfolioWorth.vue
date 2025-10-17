<template>
  <div class="mb-8">
    <div class="flex items-start justify-between mb-6">
      <div>
        <p class="text-sm text-gray-400">Total Worth</p>
        <h2 class="mt-2 text-5xl font-bold text-white">
          {{ formatCurrency(totalValue) }}
        </h2>
        <div class="mt-3 flex items-center gap-3">
          <span
            class="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold"
            :class="
              change >= 0
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            "
          >
            <Icon
              :name="change >= 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'"
              class="h-4 w-4"
            />
            {{ formatCurrency(Math.abs(changeAmount)) }}
            {{ formatPercentage(Math.abs(change / 100)) }}
          </span>
          <button
            class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            24H
            <Icon name="mdi:chevron-down" class="h-3 w-3" />
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          :disabled="loading"
          class="flex items-center gap-2 rounded-lg text-sm text-gray-400 transition-colors hover:text-white disabled:opacity-50"
          @click="$emit('refresh')"
        >
          <Icon
            name="mdi:refresh"
            class="h-5 w-5"
            :class="{ 'animate-spin': loading }"
          />
          Sync All
        </button>
        <span class="text-xs text-gray-500">
          Last Updated {{ formattedSyncTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatPercentage } from "~/utils/format";

interface Props {
  totalValue: number;
  change: number;
  changeAmount: number;
  loading?: boolean;
  lastSyncTime?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  lastSyncTime: () => new Date(),
});

defineEmits<{
  refresh: [];
}>();

const formattedSyncTime = computed(() => {
  if (!props.lastSyncTime) return "Never";
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - props.lastSyncTime.getTime()) / 1000
  );

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
});
</script>
