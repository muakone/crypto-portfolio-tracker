<template>
  <div
    class="rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-red-500/20 px-6 py-4">
      <h2 class="text-xl font-semibold text-red-400 flex items-center gap-2">
        <Icon name="mdi:alert-octagon" class="h-6 w-6" /> Danger Zone
      </h2>
    </div>
    <div class="p-6 space-y-4">
      <div
        class="flex items-center justify-between py-3 border-b border-red-500/10"
      >
        <div>
          <p class="font-medium text-white">Export Your Data</p>
          <p class="text-sm text-gray-400">Download all your portfolio data</p>
        </div>
        <button
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          Export
        </button>
      </div>

      <div class="flex items-center justify-between py-3">
        <div>
          <p class="font-medium text-red-400">Delete Account</p>
          <p class="text-sm text-gray-400">
            Permanently delete your account and data
          </p>
        </div>
        <button
          @click="$emit('confirm-delete')"
          class="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm-delete"] as const);
</script>
