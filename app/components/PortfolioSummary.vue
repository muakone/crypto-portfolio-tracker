<template>
  <section class="glass-card overflow-hidden rounded-3xl">
    <div class="space-y-8 p-8">
      <header
        class="flex flex-wrap items-start justify-between gap-6 text-gray-100"
      >
        <div>
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/60 to-sky-500/80"
            >
              <Icon name="mdi:chart-line-variant" class="h-5 w-5" />
            </span>
            <div>
              <p class="section-title">Portfolio Balance</p>
              <p class="mt-1 text-5xl font-semibold text-white">
                {{ loading ? "..." : totalValue }}
              </p>
            </div>
          </div>
          <p class="mt-4 text-sm text-gray-400">
            Tracking {{ loading ? "..." : totalTokens }} assets across all
            connected wallets and exchanges in real time.
          </p>
        </div>

        <div class="space-y-4 text-right">
          <div
            class="inline-flex gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200"
          >
            <Icon name="mdi:arrow-up" class="h-4 w-4" />
            <span>24h Change</span>
            <span class="font-semibold text-emerald-100">+0.00%</span>
          </div>
          <div class="flex gap-2 text-xs">
            <button
              class="rounded-full bg-white px-3 py-1 font-semibold text-slate-900 shadow-sm"
            >
              24h
            </button>
            <button
              class="rounded-full border border-white/10 px-3 py-1 text-gray-400 hover:text-white hover:border-white/30"
            >
              7d
            </button>
            <button
              class="rounded-full border border-white/10 px-3 py-1 text-gray-400 hover:text-white hover:border-white/30"
            >
              30d
            </button>
          </div>
        </div>
      </header>

      <div class="card-divider" />

      <dl class="grid gap-6 md:grid-cols-3">
        <div
          class="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-6 shadow-inner"
        >
          <dt class="text-sm text-gray-400">Total Assets</dt>
          <dd class="mt-3 text-3xl font-semibold text-white">
            {{ loading ? "..." : totalTokens }}
          </dd>
          <p class="mt-3 text-xs text-gray-500">
            Includes coins, stablecoins, and tokens synced from your wallets.
          </p>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-teal-400/5 to-slate-900/60 p-6 shadow-inner"
        >
          <dt class="text-sm text-gray-400">Daily PnL</dt>
          <dd class="mt-3 text-3xl font-semibold text-emerald-400">+$0.00</dd>
          <div class="mt-4">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Today</span>
              <span>Goal $500</span>
            </div>
            <div class="mt-2 h-2 rounded-full bg-white/5">
              <span
                class="block h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                style="width: 15%"
              />
            </div>
            <p class="mt-2 text-xs text-emerald-200">+$84 vs yesterday</p>
          </div>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/60 p-6 shadow-inner"
        >
          <dt class="text-sm text-gray-400">Sync Status</dt>
          <dd
            class="mt-3 flex items-center gap-2 text-3xl font-semibold text-white"
          >
            <Icon
              name="mdi:refresh"
              class="h-6 w-6 animate-spin"
              style="animation-duration: 3s"
            />
            01:00
          </dd>
          <p class="mt-3 text-xs text-gray-500">
            Automatic refresh keeps your balances aligned with live market
            prices.
          </p>
          <div class="mt-4 flex items-center gap-2 text-xs text-indigo-200">
            <Icon name="mdi:shield-check" class="h-4 w-4" />
            <span>Protected by Supabase auth</span>
          </div>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
defineProps({
  totalValue: {
    type: String,
    default: "$0.00",
  },
  totalTokens: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
