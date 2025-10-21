<template>
  <div class="min-h-screen px-6 py-8 lg:py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header (Desktop Only) -->
      <div class="mb-8 hidden lg:block">
        <NuxtLink
          to="/dashboard"
          class="text-gray-400 hover:text-white mb-4 inline-block"
        >
          ← Back to Dashboard
        </NuxtLink>
        <h1 class="text-4xl font-bold mb-2">Analytics</h1>
        <p class="text-gray-400">Advanced portfolio analytics and insights</p>
      </div>

      <!-- Coming Soon Card -->
      <div
        class="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-12 text-center"
      >
        <div class="max-w-2xl mx-auto">
          <!-- Title -->
          <h2
            class="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Coming Soon
          </h2>

          <!-- Description -->
          <p class="mb-8 text-lg text-gray-400">
            Advanced portfolio analytics and insights are under development
          </p>

          <!-- Feature List -->
          <div class="mx-auto mb-8 max-w-md space-y-3 text-left">
            <div class="flex items-center gap-3 text-gray-300">
              <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400" />
              <span>Performance tracking & metrics</span>
            </div>
            <div class="flex items-center gap-3 text-gray-300">
              <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400" />
              <span>Profit & loss analysis</span>
            </div>
            <div class="flex items-center gap-3 text-gray-300">
              <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400" />
              <span>Asset allocation insights</span>
            </div>
            <div class="flex items-center gap-3 text-gray-300">
              <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400" />
              <span>Historical trends & patterns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
