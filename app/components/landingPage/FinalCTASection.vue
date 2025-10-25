<template>
  <section class="mb-32">
    <div
      class="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 sm:p-12 md:p-16 backdrop-blur"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
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
            >Ready to Take Control?</span
          >
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
            >Get Started Free</NuxtLink
          >
          <NuxtLink
            to="/"
            class="rounded-full border-2 border-slate-600 bg-transparent px-8 py-4 text-lg font-semibold text-slate-100 transition-all hover:border-blue-500 hover:bg-blue-500/10"
            >Schedule a Demo</NuxtLink
          >
        </div>

        <p class="mt-8 text-sm text-slate-400">
          No credit card required • Free forever • Premium features available
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Final CTA wrapper
</script>

<style scoped></style>
