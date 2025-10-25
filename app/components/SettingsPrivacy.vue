<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-white/10 px-6 py-4">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <Icon name="mdi:eye-off" class="h-6 w-6 text-purple-400" /> Privacy
      </h2>
    </div>
    <div class="p-6 space-y-4">
      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Public Portfolio</p>
          <p class="text-sm text-gray-400">
            Allow others to view your portfolio
          </p>
        </div>
        <button
          @click="$emit('update:publicPortfolio', !publicPortfolio)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            publicPortfolio ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              publicPortfolio && 'translate-x-7',
            ]"
          />
        </button>
      </div>

      <div class="flex items-center justify-between py-3">
        <div>
          <p class="font-medium text-white">Analytics & Performance</p>
          <p class="text-sm text-gray-400">Share anonymous usage data</p>
        </div>
        <button
          @click="$emit('update:dataSharing', !dataSharing)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            dataSharing ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              dataSharing && 'translate-x-7',
            ]"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ publicPortfolio: boolean; dataSharing: boolean }>();
const emit = defineEmits([
  "update:publicPortfolio",
  "update:dataSharing",
] as const);
</script>
