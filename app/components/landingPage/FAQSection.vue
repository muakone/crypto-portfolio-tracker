<template>
  <section class="mb-32">
    <div class="text-center" data-aos="fade-up">
      <h3 class="text-3xl font-bold sm:text-4xl">
        <span
          class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >Frequently Asked Questions</span
        >
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
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const openedFaq = ref<number | null>(null);
function toggleFaq(idx: number) {
  openedFaq.value = openedFaq.value === idx ? null : idx;
}
</script>

<style scoped>
/* reuse fade transition from index.vue if needed */
</style>
