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

    <main class="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <!-- 1. HERO + WALLET CONNECTIONS SECTION (componentized) -->
      <HeroSection>
        <template #wallet-cards>
          <WalletCards :heroWallets="heroWallets" />
        </template>
      </HeroSection>

      <!-- 2. FEATURES / VALUE PROPOSITION (component) -->
      <FeaturesSection>
        <!-- feature cards passed through default slot to preserve UI -->
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
            Connect 300+ wallets and exchanges. Track everything from one place.
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
            Track staking, yield farming, liquidity pools, and NFT collections.
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
            Get notified when your coins hit target prices or change thresholds.
          </p>
        </div>
      </FeaturesSection>

      <!-- 3. INTEGRATIONS SHOWCASE -->
      <IntegrationsSection>
        <template #logos>
          <div
            v-for="(l, i) in logoGrid"
            :key="i"
            class="grid aspect-square place-items-center rounded-xl bg-slate-800/50 p-3 transition hover:bg-slate-700/50"
          >
            <img :src="l" alt="integration" class="h-10 w-10 object-contain" />
          </div>
        </template>
      </IntegrationsSection>

      <!-- 4. SECURITY SECTION -->
      <SecuritySection>
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
              <path d="M12 2l7 4v6c0 5-3.8 9.4-7 10-3.2-.6-7-5-7-10V6l7-4z" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-slate-100">End-to-End Encryption</p>
            <p class="mt-1 text-sm text-slate-400">
              All data encrypted at rest and in transit using AES-256 standards.
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
            <p class="font-semibold text-slate-100">Regular Security Audits</p>
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
              We never ask for withdrawal permissions. Your funds stay yours.
            </p>
          </div>
        </div>
      </SecuritySection>

      <!-- 5. FAQ SECTION -->
      <FAQSection />

      <!-- 6. FINAL CTA SECTION -->
      <FinalCTASection />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroSection from "~/components/landingPage/HeroSection.vue";
import WalletCards from "~/components/landingPage/WalletCards.vue";
import FeaturesSection from "~/components/landingPage/FeaturesSection.vue";
import IntegrationsSection from "~/components/landingPage/IntegrationsSection.vue";
import SecuritySection from "~/components/landingPage/SecuritySection.vue";
import FAQSection from "~/components/landingPage/FAQSection.vue";
import FinalCTASection from "~/components/landingPage/FinalCTASection.vue";

// BackToTop is a standalone component already; if needed you can import it
// import BackToTop from "~/components/BackToTop.vue";

// HERO cards
const heroWallets = [
  { title: "Binance", logo: "/assets/img/binance-logo.svg" },
  { title: "MetaMask", logo: "/assets/img/metamask-icon.svg" },
  { title: "OKX Wallet", logo: "/assets/img/okx.svg" },
  { title: "More", logo: "/assets/img/connect-other-portfolio.svg" },
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
