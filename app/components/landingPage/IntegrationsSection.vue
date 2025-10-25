<template>
  <section class="mb-32">
    <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div data-aos="fade-right">
        <h2 class="text-3xl font-bold leading-tight sm:text-4xl">
          Track Crypto Across
          <span
            class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            300+ Platforms
          </span>
        </h2>
        <p class="mt-6 text-lg text-slate-300">
          CoinFlow supports 300+ wallets, exchanges, 1,000 DeFi protocols, and
          100+ blockchains. Connect MetaMask, Trust Wallet, Ledger, Binance,
          Coinbase, and more in just a few clicks.
        </p>
        <NuxtLink
          to="/add-wallet"
          class="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-600/20 border border-blue-500/50 px-8 py-4 font-semibold text-blue-300 transition hover:bg-blue-600/30 hover:border-blue-400"
          >Connect Your Portfolio</NuxtLink
        >
      </div>

      <div
        class="rounded-3xl border border-slate-700/50 bg-slate-900/30 p-6 sm:p-8 backdrop-blur"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6">
          <slot name="logos" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Integrations section wrapper — logos provided through slot
</script>

<style scoped></style>
