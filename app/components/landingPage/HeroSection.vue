<template>
  <section class="lg:mb-32 mb-8 md:py-6">
    <div class="mb-16 text-center">
      <h1
        class="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-6xl"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <span
          class="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
        >
          Track Your Entire
        </span>
        <br />
        <span>Crypto Portfolio</span>
      </h1>

      <p
        class="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Connect all your wallets and exchanges in seconds. Monitor your crypto,
        DeFi positions, and NFTs from a single, powerful dashboard.
      </p>

      <!-- CTA Buttons -->
      <div
        class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <NuxtLink
          to="/login"
          class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:shadow-blue-500/50"
        >
          Get Started Free
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M13.172 7l-1.414 1.414L14.343 11H6v2h8.343l-2.585 2.586L13.172 17 18 12z"
            />
          </svg>
        </NuxtLink>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full border-2 border-blue-500/50 bg-transparent px-8 py-4 text-lg font-semibold text-slate-100 transition hover:border-blue-400 hover:bg-blue-500/10"
        >
          Watch Demo
        </NuxtLink>
      </div>

      <!-- Trust Indicators -->
      <div
        class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
        data-aos="fade-in"
        data-aos-delay="400"
      >
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l7 4v6c0 5-3.8 9.4-7 10-3.2-.6-7-5-7-10V6l7-4z" />
          </svg>
          <span>Bank-level Security</span>
        </div>
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-purple-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
          <span>500K+ Users</span>
        </div>
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
          <span>4.9/5 Rating</span>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-6xl">
      <!-- Decorative gradient orbs -->
      <div
        class="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl opacity-50"
      ></div>
      <div
        class="absolute -right-20 top-0 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl opacity-50"
      ></div>

      <div class="relative">
        <div class="mb-8 text-center" data-aos="zoom-in" data-aos-delay="500">
          <div class="relative inline-block">
            <div
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur"
            ></div>
            <h3
              class="relative rounded-full border border-blue-500/30 bg-slate-900/90 px-6 py-3 text-xl font-bold backdrop-blur"
            >
              <span
                class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Connect 300+ Wallets & Exchanges
              </span>
            </h3>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          <slot name="wallet-cards" />
        </div>

        <div
          class="animate-fade-in-up mt-8 text-center"
          style="animation-delay: 1.3s; opacity: 0"
        >
          <NuxtLink
            to="/"
            class="group inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
          >
            <span>Explore all 300+ integrations</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M13.172 7l-1.414 1.414L14.343 11H6v2h8.343l-2.585 2.586L13.172 17 18 12z"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Self-contained hero section — slot used for wallet cards list
</script>

<style scoped></style>
