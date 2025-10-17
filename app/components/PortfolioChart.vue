<template>
  <div class="h-full flex flex-col">
    <div class="mb-4">
      <p class="text-xs uppercase tracking-wider text-gray-500 mb-1">
        Allocation
      </p>
      <h3 class="text-base font-semibold text-white">Portfolio Distribution</h3>
    </div>

    <div
      v-if="!distribution || distribution.length === 0"
      class="flex-1 flex items-center justify-center py-12 text-center"
    >
      <div>
        <Icon
          name="mdi:chart-donut"
          class="mx-auto mb-4 h-16 w-16 text-slate-500"
        />
        <p class="text-gray-400 text-sm">No data to display</p>
      </div>
    </div>

    <div v-else class="flex-1 flex flex-col">
      <!-- Chart -->
      <div class="flex-1 flex items-center justify-center mb-4">
        <div class="relative w-44 h-44">
          <Doughnut :data="chartData" :options="chartOptions" />
          <div
            class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <p class="text-xs uppercase tracking-wider text-gray-500">Total</p>
            <p class="mt-1 text-base font-bold text-white">
              {{ formattedTotal }}
            </p>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="space-y-1.5">
        <div
          v-for="(item, index) in distribution.slice(0, 5)"
          :key="item.symbol"
          class="flex items-center justify-between text-sm"
        >
          <div class="flex items-center gap-2">
            <div
              class="h-2.5 w-2.5 rounded-full flex-shrink-0"
              :style="{ backgroundColor: chartColors[index] }"
            />
            <span class="text-gray-400 text-xs">{{ item.symbol }}</span>
          </div>
          <span class="font-medium text-white text-xs"
            >{{ item.percentage.toFixed(1) }}%</span
          >
        </div>
        <div v-if="distribution.length > 5" class="text-center pt-1">
          <span class="text-xs text-gray-500"
            >+{{ distribution.length - 5 }} more</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import type { TokenDistribution } from "~~/shared/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{ distribution: TokenDistribution[] }>();

const chartColors = [
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#a855f7", // violet
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#14b8a6", // teal
  "#10b981", // emerald
];

const totalValue = computed(() =>
  props.distribution.reduce(
    (sum: number, item: TokenDistribution) => sum + item.value,
    0
  )
);

const formattedTotal = computed(() => {
  const value = totalValue.value;
  if (!value) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : 2,
  }).format(value);
});

const chartData = computed<ChartData<"doughnut">>(() => {
  return {
    labels: props.distribution.map((item: TokenDistribution) => item.symbol),
    datasets: [
      {
        data: props.distribution.map((item: TokenDistribution) => item.value),
        backgroundColor: chartColors.slice(0, props.distribution.length),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
});

const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      padding: 12,
      titleColor: "#f3f4f6",
      bodyColor: "#f3f4f6",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      callbacks: {
        label: (context: TooltipItem<"doughnut">) => {
          const label = context.label || "";
          const value = Number(context.parsed) || 0;
          const distributionItem = props.distribution[context.dataIndex];
          const percentage = distributionItem?.percentage ?? 0;
          return `${label}: $${value.toLocaleString()} (${percentage.toFixed(
            1
          )}%)`;
        },
      },
    },
  },
};
</script>
