<!-- app/layouts/default.vue -->
<template>
  <div class="app-shell text-slate-100">
    <div class="app-shell__grid" aria-hidden="true" />
    <div class="app-shell__aurora" aria-hidden="true" />
    <div class="app-shell__beam" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--violet" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--teal" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--blue" aria-hidden="true" />

    <div class="relative z-10 flex min-h-screen flex-col">
      <NuxtLoadingIndicator color="#38bdf8" />
      <TheNavbar />
      <main class="flex-1 px-4 py-10 sm:px-8">
        <NuxtPage />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: "%s - Crypto Portfolio Tracker",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
