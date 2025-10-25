<template>
  <section class="mb-32" data-aos="fade-up">
    <div
      class="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 sm:p-12 backdrop-blur"
    >
      <div class="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
        <div data-aos="fade-right" data-aos-delay="100">
          <h3 class="text-3xl font-bold sm:text-4xl">
            <span
              class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >Military-Grade Security</span
            >
            <br />for Your Digital Assets
          </h3>
          <p class="mt-6 text-lg text-slate-300">
            We use industry-leading security practices to protect your data.
            Read-only API connections mean your funds stay completely safe under
            any circumstances.
          </p>
        </div>

        <div
          class="space-y-4 sm:space-y-6"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Security section wrapper — the inner cards are passed via default slot
</script>

<style scoped></style>
