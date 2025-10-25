<template>
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

    <!-- Loading -->
    <div v-if="loading" class="px-6 py-24 text-center">
      <Icon
        name="mdi:loading"
        class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
      />
      <p class="text-gray-400">Loading assets...</p>
    </div>

    <!-- Table -->
    <div
      v-else-if="tokens && tokens.length > 0"
      class="overflow-x-auto scrollbar-hide"
    >
      <table class="w-full min-w-[700px] sm:min-w-[900px]">
        <thead>
          <tr class="border-b border-white/5">
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              Asset
            </th>
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              Price
            </th>
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              Balance
            </th>
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              Value
            </th>
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              24H Change
            </th>
            <th
              class="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium uppercase text-gray-500 whitespace-nowrap"
            >
              Allocation
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="token in paginatedTokens"
            :key="token.id"
            class="hover:bg-white/5 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-lg sm:text-xl"
                >
                  {{ getTokenIcon(token.symbol) }}
                </div>
                <div>
                  <p class="text-sm sm:text-base font-semibold text-white">
                    {{ token.name }}
                  </p>
                  <p class="text-xs text-gray-400">{{ token.symbol }}</p>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 text-right">
              <p class="text-xs sm:text-sm font-medium text-white">
                {{ formatCurrency(token.price || 0) }}
              </p>
            </td>
            <td class="px-6 py-4 text-right">
              <p class="text-xs sm:text-sm text-gray-300">
                {{ formatAmount(token.balance || 0) }}
              </p>
            </td>
            <td class="px-6 py-4 text-right">
              <p class="text-xs sm:text-sm font-semibold text-white">
                {{ formatCurrency(token.usd_value || 0) }}
              </p>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="inline-flex flex-col items-end">
                <span
                  :class="[
                    'text-xs sm:text-sm font-semibold',
                    (token.change_24h || 0) >= 0
                      ? 'text-green-400'
                      : 'text-red-400',
                  ]"
                >
                  {{ (token.change_24h || 0) >= 0 ? "+" : ""
                  }}{{ (token.change_24h || 0).toFixed(2) }}%
                </span>
                <span class="text-xs text-gray-500">{{
                  formatCurrency(Math.abs(token.change_24h_value || 0))
                }}</span>
              </div>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex items-center gap-2 justify-end">
                <div class="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    :style="{ width: `${getAllocation(token.usd_value)}%` }"
                  ></div>
                </div>
                <span class="text-xs text-gray-400 w-12 text-right"
                  >{{ getAllocation(token.usd_value).toFixed(1) }}%</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t border-white/5 px-6 py-4"
      >
        <div class="text-sm text-gray-400 hidden sm:block">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, sortedTokens.length) }} of
          {{ sortedTokens.length }} assets
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 sm:hidden text-sm text-gray-400">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="mdi:chevron-left" class="h-5 w-5" />
            </button>
            <div class="text-sm">Page {{ currentPage }} / {{ totalPages }}</div>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="mdi:chevron-right" class="h-5 w-5" />
            </button>
          </div>

          <div class="hidden sm:flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="mdi:chevron-left" class="h-5 w-5" />
            </button>

            <div class="flex items-center gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                v-show="
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                "
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 rounded-lg border transition-all min-w-[40px]',
                  page === currentPage
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400 font-semibold'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10',
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="mdi:chevron-right" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="px-6 py-24 text-center">
      <Icon
        name="mdi:wallet-outline"
        class="h-16 w-16 mx-auto mb-4 text-gray-600"
      />
      <h3 class="text-2xl font-semibold text-white mb-2">No Assets Yet</h3>
      <p class="text-gray-400 mb-6">Add your first wallet to start tracking</p>
      <NuxtLink
        to="/add-wallet"
        class="inline-flex px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
        >+ Add Wallet</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TokenRecord } from "~~/shared/types";
import { formatCurrency, formatAmount } from "~/utils/format";

const props = withDefaults(
  defineProps<{
    tokens: TokenRecord[];
    totalValue: number;
    loading: boolean;
    refresh: () => Promise<void>;
    paginatedTokens: TokenRecord[];
    sortedTokens: TokenRecord[];
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    getTokenIcon: (s: string) => string;
    getAllocation: (v: number) => number;
  }>(),
  {
    tokens: [],
    totalValue: 0,
    loading: false,
    refresh: async () => {},
    paginatedTokens: [],
    sortedTokens: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    goToPage: (p: number) => {},
    getTokenIcon: (s: string) => "◆",
    getAllocation: (v: number) => 0,
  }
);

const {
  tokens,
  loading,
  refresh,
  paginatedTokens,
  sortedTokens,
  currentPage,
  itemsPerPage,
  totalPages,
  goToPage,
  getTokenIcon,
  getAllocation,
} = props;
</script>
