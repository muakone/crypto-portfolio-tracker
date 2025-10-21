<template>
  <footer
    class="relative mt-24 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur"
  >
    <!-- Gradient background effects -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent"
    ></div>
    <div
      class="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl"
    ></div>
    <div
      class="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-600/5 blur-3xl"
    ></div>

    <div
      class="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 text-sm text-slate-300 sm:flex-row sm:items-start sm:justify-between"
    >
      <!-- Brand Section -->
      <div class="max-w-sm space-y-4 animate-fade-in">
        <div class="flex items-center gap-3 text-white">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5zm0 18c-4.4-1.1-7-5.2-7-9V8.3l7-3.5 7 3.5V11c0 3.8-2.6 7.9-7 9z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold">
              <span
                class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >CoinFlow</span
              >
            </p>
            <p class="text-xs text-slate-400">Portfolio Tracker</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-slate-400">
          Track every wallet, exchange, and token in one place. Real-time
          prices, powerful analytics, and seamless integrations.
        </p>

        <!-- Social Links -->
        <div class="flex flex-wrap gap-3 pt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 transition-all hover:border-blue-500/50 hover:bg-blue-600/10"
          >
            <Icon
              name="mdi:twitter"
              class="h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-400"
            />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 transition-all hover:border-purple-500/50 hover:bg-purple-600/10"
          >
            <Icon
              name="mdi:discord"
              class="h-5 w-5 text-slate-400 transition-colors group-hover:text-purple-400"
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 transition-all hover:border-indigo-500/50 hover:bg-indigo-600/10"
          >
            <Icon
              name="mdi:github"
              class="h-5 w-5 text-slate-400 transition-colors group-hover:text-indigo-400"
            />
          </a>
          <a
            href="mailto:support@coinflow.app"
            class="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 transition-all hover:border-blue-500/50 hover:bg-blue-600/10"
          >
            <Icon
              name="mdi:email-outline"
              class="h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-400"
            />
          </a>
        </div>
      </div>

      <!-- Links Grid -->
      <div class="grid flex-1 gap-8 sm:grid-cols-3 md:gap-12">
        <div class="space-y-4 animate-fade-in" style="animation-delay: 100ms">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-blue-400"
          >
            Product
          </p>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/dashboard"
                class="text-slate-400 transition-colors hover:text-blue-400"
                >Dashboard</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/add-wallet"
                class="text-slate-400 transition-colors hover:text-blue-400"
                >Add Wallet</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-blue-400"
                >Features</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-blue-400"
                >Pricing</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="space-y-4 animate-fade-in" style="animation-delay: 200ms">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-purple-400"
          >
            Resources
          </p>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-purple-400"
                >Documentation</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-purple-400"
                >API Reference</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-purple-400"
                >Blog</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-purple-400"
                >Support</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="space-y-4 animate-fade-in" style="animation-delay: 300ms">
          <p
            class="text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            Company
          </p>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-indigo-400"
                >About Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-indigo-400"
                >Careers</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-indigo-400"
                >Contact</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-slate-400 transition-colors hover:text-indigo-400"
                >Press Kit</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-slate-700/50 px-6 py-6">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="animate-fade-in">
          © {{ currentYear }} CoinFlow. All rights reserved.
        </p>
        <div
          class="flex flex-wrap gap-6 animate-fade-in"
          style="animation-delay: 100ms"
        >
          <NuxtLink to="/" class="transition-colors hover:text-blue-400"
            >Privacy Policy</NuxtLink
          >
          <NuxtLink to="/" class="transition-colors hover:text-blue-400"
            >Terms of Service</NuxtLink
          >
          <NuxtLink to="/" class="transition-colors hover:text-blue-400"
            >Cookie Policy</NuxtLink
          >
          <NuxtLink to="/" class="transition-colors hover:text-blue-400"
            >Status</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>
