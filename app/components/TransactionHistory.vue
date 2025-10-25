<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl">
    <div
      class="flex items-center justify-between border-b border-white/10 px-6 py-4"
    >
      <h3 class="text-lg font-semibold text-white">Recent Transactions</h3>
      <NuxtLink
        to="/transactions"
        class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        View All
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="px-6 py-16 text-center">
      <Icon
        name="mdi:loading"
        class="h-12 w-12 mx-auto mb-3 animate-spin text-blue-500"
      />
      <p class="text-gray-400">Loading transactions...</p>
    </div>

    <!-- Transactions List -->
    <div v-else-if="transactions.length > 0" class="divide-y divide-white/5">
      <div
        v-for="tx in displayedTransactions"
        :key="tx.hash"
        class="px-6 py-4 hover:bg-white/5 transition-colors"
      >
        <div class="flex items-center justify-between">
          <!-- Left: Transaction Info -->
          <div class="flex items-center gap-4">
            <!-- Icon -->
            <div
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full text-xl',
                tx.isOutgoing
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-green-500/20 text-green-400',
              ]"
            >
              {{ tx.isOutgoing ? "↑" : "↓" }}
            </div>

            <!-- Details -->
            <div>
              <p class="font-semibold text-white text-sm">
                {{ tx.isOutgoing ? "Sent" : "Received" }} {{ tx.type }}
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <span>{{
                  formatAddress(tx.isOutgoing ? tx.to : tx.from)
                }}</span>
                <span>•</span>
                <span>{{ formatTime(tx.timestamp) }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Amount & Status -->
          <div class="text-right">
            <p
              :class="[
                'font-semibold text-sm',
                tx.isOutgoing ? 'text-red-400' : 'text-green-400',
              ]"
            >
              {{ tx.isOutgoing ? "-" : "+" }}{{ tx.value.toFixed(6) }}
              {{ tx.type }}
            </p>
            <div class="flex items-center gap-1.5 justify-end mt-1">
              <span
                v-if="!tx.isError"
                class="inline-flex items-center gap-1 text-xs text-green-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                Confirmed
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 text-xs text-red-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                Failed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="px-6 py-16 text-center">
      <Icon
        name="mdi:swap-horizontal"
        class="h-16 w-16 mx-auto mb-4 text-gray-600"
      />
      <h3 class="text-xl font-semibold text-white mb-2">No Transactions Yet</h3>
      <p class="text-gray-400 text-sm">
        Your transaction history will appear here
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction as SharedTransaction } from "~~/shared/types";

interface Props {
  transactions: SharedTransaction[];
  loading?: boolean;
  limit?: number;
  walletAddress?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  limit: 5,
});

// Add isOutgoing flag to transactions
const displayedTransactions = computed(() => {
  return props.transactions.slice(0, props.limit).map((tx) => ({
    ...tx,
    isOutgoing: props.walletAddress
      ? tx.from.toLowerCase() === props.walletAddress.toLowerCase()
      : tx.from.toLowerCase().includes("0x"), // Default heuristic
  }));
});

// Format wallet address
const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format timestamp
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
</script>
