<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-white/10 px-6 py-4">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <Icon name="mdi:shield-lock" class="h-6 w-6 text-red-400" /> Security
      </h2>
    </div>
    <div class="p-6 space-y-4">
      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Change Password</p>
          <p class="text-sm text-gray-400">Update your account password</p>
        </div>
        <button
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          Change
        </button>
      </div>

      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Two-Factor Authentication</p>
          <p class="text-sm text-gray-400">Add an extra layer of security</p>
        </div>
        <button
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          Enable
        </button>
      </div>

      <div class="flex items-center justify-between py-3">
        <div>
          <p class="font-medium text-white">Active Sessions</p>
          <p class="text-sm text-gray-400">Manage your logged-in devices</p>
        </div>
        <button
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple presentational security section
</script>
