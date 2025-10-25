<template>
  <div
    class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden"
  >
    <div v-if="loading" class="px-6 py-24 text-center">
      <Icon
        name="mdi:loading"
        class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
      />
      <p class="text-gray-400">Loading transactions...</p>
    </div>

    <div v-else-if="paginatedTransactions && paginatedTransactions.length > 0">
      <div class="overflow-x-auto scrollbar-hide">
        <table class="w-full min-w-[800px]">
          <thead>
            <tr class="border-b border-white/10">
              <th
                class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
              >
                Type
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
              >
                Hash
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500"
              >
                From/To
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500"
              >
                Amount
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500"
              >
                Time
              </th>
              <th
                class="px-6 py-4 text-center text-xs font-medium uppercase text-gray-500"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr
              v-for="tx in paginatedTransactions"
              :key="tx.hash"
              class="hover:bg-white/5 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm',
                      tx.isOutgoing
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400',
                    ]"
                  >
                    {{ tx.isOutgoing ? "↑" : "↓" }}
                  </div>
                  <span class="text-sm text-gray-300">{{
                    tx.isOutgoing ? "Sent" : "Received"
                  }}</span>
                </div>
              </td>

              <td class="px-6 py-4">
                <a
                  :href="getExplorerLink(tx)"
                  target="_blank"
                  class="text-sm text-blue-400 hover:text-blue-300 font-mono"
                  >{{ formatHash(tx.hash) }}</a
                >
              </td>

              <td class="px-6 py-4">
                <div class="text-sm text-gray-300 font-mono">
                  {{ formatAddress(tx.isOutgoing ? tx.to : tx.from) }}
                </div>
              </td>

              <td class="px-6 py-4 text-right">
                <div
                  :class="[
                    'text-sm font-semibold',
                    tx.isOutgoing ? 'text-red-400' : 'text-green-400',
                  ]"
                >
                  {{ tx.isOutgoing ? "-" : "+" }}{{ tx.value.toFixed(6) }}
                  <span class="text-gray-500">{{ tx.type }}</span>
                </div>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="text-sm text-gray-400">
                  {{ formatFullTime(tx.timestamp) }}
                </div>
              </td>

              <td class="px-6 py-4 text-center">
                <span
                  v-if="!tx.isError"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium"
                  ><span class="h-1.5 w-1.5 rounded-full bg-green-400"></span
                  >Success</span
                >
                <span
                  v-else
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium"
                  ><span class="h-1.5 w-1.5 rounded-full bg-red-400"></span
                  >Failed</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t border-white/5 px-6 py-4"
      >
        <div class="text-sm text-gray-400 hidden sm:block">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, filteredLength) }} of
          {{ filteredLength }} transactions
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

    <div v-else class="px-6 py-24 text-center">
      <Icon
        name="mdi:file-document-outline"
        class="h-16 w-16 mx-auto mb-4 text-gray-600"
      />
      <h3 class="text-2xl font-semibold text-white mb-2">
        No Transactions Found
      </h3>
      <p class="text-gray-400">No transactions match your current filters</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean;
    paginatedTransactions: any[];
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    goToPage: (p: number) => void;
    filteredLength: number;
    formatAddress: (s: string) => string;
    formatHash: (s: string) => string;
    formatFullTime: (n: number) => string;
    getExplorerLink: (tx: any) => string;
  }>(),
  {
    loading: false,
    paginatedTransactions: [],
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 1,
    goToPage: (p: number) => {},
    filteredLength: 0,
    formatAddress: (s: string) => s,
    formatHash: (s: string) => s,
    formatFullTime: (n: number) => String(n),
    getExplorerLink: (t: any) => "#",
  }
);

const {
  loading,
  paginatedTransactions,
  currentPage,
  itemsPerPage,
  totalPages,
  goToPage,
  filteredLength,
  formatAddress,
  formatHash,
  formatFullTime,
  getExplorerLink,
} = props;
</script>
