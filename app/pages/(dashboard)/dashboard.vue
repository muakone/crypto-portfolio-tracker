<template>
  <div class="min-h-screen">
    <!-- Top Header with Action Buttons -->
    <DashboardHeader />

    <!-- Main Content -->
    <div class="px-6 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="py-24 text-center text-gray-400">
        <Icon
          name="mdi:loading"
          class="h-16 w-16 mx-auto mb-4 animate-spin text-blue-500"
        />
        <p>Loading your portfolio…</p>
      </div>

      <!-- Logged In - Dashboard Content -->
      <div v-else-if="user">
        <!-- Total Worth Section -->
        <PortfolioWorth
          :total-value="displayTotalValue"
          :change="totalChange"
          :change-amount="totalChangeAmount"
          :loading="portfolioLoading"
          :last-sync-time="lastSync"
          @refresh="refresh"
        />

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <!-- Left Column: Portfolio Chart -->
          <div class="xl:col-span-4">
            <div
              class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 h-full"
            >
              <PortfolioChart :distribution="dummyDistribution" />
            </div>
          </div>

          <!-- Right Column: Assets Table -->
          <div class="xl:col-span-8">
            <div
              class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden"
            >
              <div
                class="flex items-center justify-between border-b border-white/10 px-6 py-4"
              >
                <h3 class="md:text-lg font-semibold text-white">Your Assets</h3>
                <div class="flex items-center gap-3">
                  <NuxtLink
                    to="/add-wallet"
                    class="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
                  >
                    <Icon name="mdi:plus" class="h-4 w-4 md:block hidden" />
                    Add Wallet
                  </NuxtLink>
                  <NuxtLink
                    to="/assets"
                    class="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    View All
                
                  </NuxtLink>
                </div>
              </div>
              <div class="overflow-x-auto scrollbar-hide">
                <AssetsTable
                  :tokens="displayTokens"
                  :collapsed="isSidebarCollapsed"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="mt-6">
          <TransactionHistory
            :transactions="transactions"
            :loading="txLoading"
            :limit="5"
            :wallet-address="primaryWalletAddress"
          />
        </div>
      </div>

      <!-- Not Logged In -->
      <div v-else class="py-16 text-center">
        <div
          class="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/40 p-12 backdrop-blur-xl"
        >
          <Icon
            name="mdi:lock-outline"
            class="h-16 w-16 mx-auto mb-4 text-gray-500"
          />
          <h2 class="text-2xl font-semibold text-white">Please Login</h2>
          <p class="mt-3 text-sm text-gray-400">
            You need to be logged in to view your portfolio.
          </p>
          <NuxtLink
            to="/login"
            class="mt-6 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
          >
            Go to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useDashboard } from "~/composables/useDashboard";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const {
  user,
  loading,
  lastSync,
  transactions,
  txLoading,
  primaryWalletAddress,
  isSidebarCollapsed,
  displayTokens,
  displayTotalValue,
  dummyDistribution,
  totalChange,
  totalChangeAmount,
  portfolioLoading,
  refresh,
} = useDashboard();

useHead({
  title: "Dashboard",
});
</script>
