<template>
  <section class="mb-32">
    <div class="mb-16 text-center" data-aos="fade-up">
      <h2 class="text-3xl font-bold sm:text-4xl">
        Everything You Need in
        <span
          class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          One Dashboard
        </span>
      </h2>
      <p class="mt-4 text-lg text-slate-400">
        Powerful features designed for serious crypto investors
      </p>
    </div>

    <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
// Features grid wrapper; feature cards provided via default slot to preserve UI
</script>

<style scoped></style>
