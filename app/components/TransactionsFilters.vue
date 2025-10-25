<template>
  <div
    class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 mb-6"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >Wallet</label
        >
        <select
          :value="selectedWallet"
          @change="onWalletChange($event)"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Wallets</option>
          <option v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">
            {{ formatAddress(wallet.address) }} ({{ wallet.chain }})
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Type</label>
        <select
          :value="selectedType"
          @change="onTypeChange($event)"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Transactions</option>
          <option value="sent">Sent</option>
          <option value="received">Received</option>
        </select>
      </div>

      <div class="flex items-end">
        <button
          @click="$emit('refresh')"
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
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { UseTransactionsReturn } from "~/composables/useTransactions";

const props = withDefaults(
  defineProps<{
    wallets: any[];
    selectedWallet: string;
    selectedType: string;
    loading: boolean;
    formatAddress: (address: string) => string;
  }>(),
  {
    wallets: [],
    selectedWallet: "all",
    selectedType: "all",
    loading: false,
    formatAddress: (s: string) => s,
  }
);

const emit = defineEmits([
  "update:selectedWallet",
  "update:selectedType",
  "refresh",
] as const);

const { wallets, selectedWallet, selectedType, loading, formatAddress } = props;

const onWalletChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit("update:selectedWallet", val);
};

const onTypeChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  emit("update:selectedType", val);
};
</script>
