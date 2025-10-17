<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <!-- background - blue/purple theme only -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
      ></div>
      <!-- Blue/purple gradient orbs -->
      <div
        class="absolute left-[-10%] top-[-5%] h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl"
      ></div>
      <div
        class="absolute right-[-10%] bottom-[-5%] h-96 w-96 rounded-full bg-gradient-to-tl from-violet-600/15 to-indigo-600/15 blur-3xl"
      ></div>
    </div>

    <!-- Back to Top Button -->
    <transition name="fade">
      <button
        v-show="showBackToTop"
        class="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-110 hover:shadow-blue-500/50"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <Icon name="mdi:chevron-up" class="h-6 w-6" />
      </button>
    </transition>

    <main class="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <!-- 1. HERO + WALLET CONNECTIONS SECTION (CREATIVE MERGE) -->
      <section class="mb-32 py-12">
        <!-- Hero Content - Centered -->
        <div class="mb-16 text-center">
          <h1
            class="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
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
            class="mx-auto mt-6 max-w-2xl text-xl text-slate-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Connect all your wallets and exchanges in seconds. Monitor your
            crypto, DeFi positions, and NFTs from a single, powerful dashboard.
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
              to="/demo"
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

        <!-- Wallet Connection Cards - Floating Style Below Hero -->
        <div class="relative mx-auto max-w-6xl">
          <!-- Decorative gradient orbs -->
          <div
            class="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl opacity-50"
          ></div>
          <div
            class="absolute -right-20 top-0 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl opacity-50"
          ></div>

          <div class="relative">
            <!-- Header with animated gradient border -->
            <div
              class="mb-8 text-center"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
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

            <!-- Wallet Cards in Bento Grid Style -->
            <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              <div
                v-for="(w, idx) in heroWallets"
                :key="w.title"
                class="group relative"
                data-aos="fade-up"
                :data-aos-delay="600 + idx * 100"
              >
                <!-- Card with staggered hover animations -->
                <div
                  class="relative h-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <!-- Gradient overlay on hover -->
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-indigo-600/0 opacity-0 transition-all duration-300 group-hover:from-blue-600/10 group-hover:via-purple-600/5 group-hover:to-indigo-600/10 group-hover:opacity-100"
                  ></div>

                  <!-- Content -->
                  <div class="relative flex flex-col items-center space-y-4">
                    <!-- Logo with pulse animation on hover -->
                    <div class="relative">
                      <div
                        class="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      ></div>
                      <img
                        :src="w.logo"
                        :alt="w.title"
                        class="relative h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110 group-hover:animate-float"
                      />
                    </div>

                    <!-- Wallet name -->
                    <div
                      class="text-center font-semibold text-slate-200 transition-colors group-hover:text-white"
                    >
                      {{ w.title }}
                    </div>

                    <!-- Connect button -->
                    <button
                      class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600/10 px-4 py-2.5 text-sm font-semibold text-blue-300 transition-all hover:bg-blue-600/20 group-hover:bg-blue-600/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 transition-transform group-hover:rotate-90"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- View all integrations CTA -->
            <div
              class="animate-fade-in-up mt-8 text-center"
              style="animation-delay: 1.3s; opacity: 0"
            >
              <NuxtLink
                to="/integrations"
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

      <!-- 2. FEATURES / VALUE PROPOSITION -->
      <section class="mb-32">
        <div class="mb-16 text-center" data-aos="fade-up">
          <h2 class="text-3xl font-bold sm:text-4xl">
            Everything You Need in
            <span
              class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >One Dashboard</span
            >
          </h2>
          <p class="mt-4 text-lg text-slate-400">
            Powerful features designed for serious crypto investors
          </p>
        </div>

        <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 7H3V5h18v2zm0 2v10H3V9h18zM8 14h4v2H8v-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Multi-Wallet Tracking</h3>
            <p class="mt-2 text-slate-400">
              Connect 300+ wallets and exchanges. Track everything from one
              place.
            </p>
          </div>

          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.5 18.5l9-9 4 4L23 6"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Real-Time Analytics</h3>
            <p class="mt-2 text-slate-400">
              Live portfolio performance, PnL tracking, and detailed insights.
            </p>
          </div>

          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M14 3a6 6 0 100 12 6 6 0 000-12zM2 21v-2l6.3-6.3a7.96 7.96 0 002 2L4 21H2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">DeFi & NFT Support</h3>
            <p class="mt-2 text-slate-400">
              Track staking, yield farming, liquidity pools, and NFT
              collections.
            </p>
          </div>

          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l7 4v6c0 5-3.8 9.4-7 10-3.2-.6-7-5-7-10V6l7-4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Bank-Level Security</h3>
            <p class="mt-2 text-slate-400">
              Read-only API keys. Your funds stay safe, always.
            </p>
          </div>

          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Tax Reporting</h3>
            <p class="mt-2 text-slate-400">
              Generate tax-ready reports for all your crypto transactions.
            </p>
          </div>

          <div
            class="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 sm:p-8 backdrop-blur transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold">Price Alerts</h3>
            <p class="mt-2 text-slate-400">
              Get notified when your coins hit target prices or change
              thresholds.
            </p>
          </div>
        </div>
      </section>

      <!-- 3. INTEGRATIONS SHOWCASE -->
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
              CoinFlow supports 300+ wallets, exchanges, 1,000 DeFi protocols,
              and 100+ blockchains. Connect MetaMask, Trust Wallet, Ledger,
              Binance, Coinbase, and more in just a few clicks.
            </p>
            <NuxtLink
              to="/add-wallet"
              class="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-600/20 border border-blue-500/50 px-8 py-4 font-semibold text-blue-300 transition hover:bg-blue-600/30 hover:border-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 7H3V5h18v2zm0 2v10H3V9h18zM8 14h4v2H8v-2z" />
              </svg>
              Connect Your Portfolio
            </NuxtLink>
          </div>

          <div
            class="rounded-3xl border border-slate-700/50 bg-slate-900/30 p-6 sm:p-8 backdrop-blur"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6">
              <div
                v-for="(l, i) in logoGrid"
                :key="i"
                class="grid aspect-square place-items-center rounded-xl bg-slate-800/50 p-3 transition hover:bg-slate-700/50"
              >
                <img
                  :src="l"
                  alt="integration"
                  class="h-10 w-10 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. SECURITY SECTION -->
      <section class="mb-32" data-aos="fade-up">
        <div
          class="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 sm:p-12 backdrop-blur"
        >
          <div class="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div data-aos="fade-right" data-aos-delay="100">
              <h3 class="text-3xl font-bold sm:text-4xl">
                <span
                  class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Military-Grade Security
                </span>
                <br />for Your Digital Assets
              </h3>
              <p class="mt-6 text-lg text-slate-300">
                We use industry-leading security practices to protect your data.
                Read-only API connections mean your funds stay completely safe
                under any circumstances.
              </p>
            </div>

            <div
              class="space-y-4 sm:space-y-6"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div
                class="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 sm:p-6 transition-all duration-300 hover:border-blue-500/50 hover:-translate-x-2"
              >
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 2l7 4v6c0 5-3.8 9.4-7 10-3.2-.6-7-5-7-10V6l7-4z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-100">
                    End-to-End Encryption
                  </p>
                  <p class="mt-1 text-sm text-slate-400">
                    All data encrypted at rest and in transit using AES-256
                    standards.
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 sm:p-6 transition-all duration-300 hover:border-purple-500/50 hover:-translate-x-2"
              >
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M17 8V6a5 5 0 10-10 0v2H5v14h14V8h-2zm-8 0V6a3 3 0 016 0v2H9z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-100">
                    Regular Security Audits
                  </p>
                  <p class="mt-1 text-sm text-slate-400">
                    Independent third-party audits and continuous monitoring.
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-4 sm:p-6 transition-all duration-300 hover:border-indigo-500/50 hover:-translate-x-2"
              >
                <div
                  class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-indigo-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M14 3a6 6 0 100 12 6 6 0 000-12zM2 21v-2l6.3-6.3a7.96 7.96 0 002 2L4 21H2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-100">Read-Only Access</p>
                  <p class="mt-1 text-sm text-slate-400">
                    We never ask for withdrawal permissions. Your funds stay
                    yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FAQ SECTION -->
      <section class="mb-32">
        <div class="text-center" data-aos="fade-up">
          <h3 class="text-3xl font-bold sm:text-4xl">
            <span
              class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </span>
          </h3>
          <p class="mt-4 text-lg text-slate-300">
            Everything you need to know about CoinFlow and your crypto portfolio
          </p>
        </div>

        <div
          class="mt-12 divide-y divide-slate-700/50 rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            v-for="(q, idx) in faqs"
            :key="q.q"
            class="cursor-pointer p-4 sm:p-6 transition-colors hover:bg-slate-800/30"
            @click="toggleFaq(idx)"
          >
            <div class="flex items-center justify-between gap-4">
              <h4 class="text-lg font-semibold text-slate-100">{{ q.q }}</h4>
              <div
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 transition-transform duration-300"
                :class="{ 'rotate-180': openedFaq === idx }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <Transition name="fade">
              <div v-show="openedFaq === idx" class="overflow-hidden">
                <div class="mt-3 pt-3 border-t border-slate-700/30">
                  <p class="text-slate-300">{{ q.a }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- 6. FINAL CTA SECTION -->
      <section class="mb-32">
        <div
          class="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 sm:p-12 md:p-16 backdrop-blur"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <!-- Subtle gradient accents -->
          <div
            class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
          ></div>
          <div
            class="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"
          ></div>

          <div class="relative text-center">
            <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span
                class="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              >
                Ready to Take Control?
              </span>
            </h3>
            <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Join thousands of crypto investors tracking their portfolios with
              CoinFlow. Start for free today.
            </p>

            <div
              class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <NuxtLink
                to="/login"
                class="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/40"
              >
                Get Started Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M13.172 7l-1.414 1.414L14.343 11H6v2h8.343l-2.585 2.586L13.172 17 18 12z"
                  />
                </svg>
              </NuxtLink>

              <NuxtLink
                to="/demo"
                class="rounded-full border-2 border-slate-600 bg-transparent px-8 py-4 text-lg font-semibold text-slate-100 transition-all hover:border-blue-500 hover:bg-blue-500/10"
              >
                Schedule a Demo
              </NuxtLink>
            </div>

            <p class="mt-8 text-sm text-slate-400">
              No credit card required • Free forever • Premium features
              available
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// HERO cards
const heroWallets = [
  {
    title: "Binance",
    logo: "/assets/img/binance-logo.svg",
  },
  {
    title: "MetaMask",
    logo: "/assets/img/metamask-icon.svg",
  },
  {
    title: "OKX Wallet",
    logo: "/assets/img/okx.svg",
  },
  {
    title: "More",
    logo: "/assets/img/connect-other-portfolio.svg",
  },
];

// grid card logos
const logoGrid = [
  "/assets/img/trust-wallet-logo.svg",
  "/assets/img/okx.svg",
  "/assets/img/waves-waves-logo.svg",
  "/assets/img/cardano-logo.svg",
  "/assets/img/crypto.com-logo.svg",
  "/assets/img/Phantom-icon.svg",
  "/assets/img/Zerion.svg",
  "/assets/img/metamask-icon.svg",
  "/assets/img/Coinbase.png",
  "/assets/img/gmx-logo.svg",
  "/assets/img/bybit-logo-white.svg",
  "/assets/img/solana-logo.svg",
];

// FAQs
const openedFaq = ref<number | null>(null);
const faqs = [
  {
    q: "Are crypto portfolio trackers safe?",
    a: "Yes. We use read-only API keys and strict encryption so funds cannot be moved via CoinFlow.",
  },
  {
    q: "How do I start a crypto portfolio?",
    a: "Create an account, connect your exchange/wallet, and your balances will sync automatically.",
  },
  {
    q: "How do I make a good crypto portfolio?",
    a: "Diversify across assets, set targets, and use periodic rebalancing. Our analytics help you monitor risk.",
  },
  {
    q: "How do I connect my wallets?",
    a: "Use the Connect Portfolio button and follow the exchange/wallet prompts. We guide you step-by-step.",
  },
  {
    q: "What can I do on CoinFlow?",
    a: "Track PnL, fees and taxes, DeFi positions, NFTs, set alerts, export reports, and share read-only dashboards.",
  },
  {
    q: "Can I get lifetime Premium?",
    a: "We offer annual & lifetime plans periodically. Join the waitlist to be notified when available.",
  },
];

function toggleFaq(idx: number) {
  openedFaq.value = openedFaq.value === idx ? null : idx;
}

// Back to Top Button
const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* FAQ Collapse Transition */
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.fade-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.fade-enter-to {
  opacity: 1;
  max-height: 300px;
  transform: translateY(0);
}

.fade-leave-from {
  opacity: 1;
  max-height: 300px;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

/* Float animation for wallet logos */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
