<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="rounded-2xl border border-red-500/30 bg-black/90 p-6 max-w-md w-full"
    >
      <div class="flex items-center gap-3 mb-4">
        <Icon name="mdi:alert-circle" class="h-8 w-8 text-red-400" />
        <h3 class="text-xl font-bold text-white">Delete Account?</h3>
      </div>
      <p class="text-gray-300 mb-6">
        This action cannot be undone. All your data, wallets, and transaction
        history will be permanently deleted.
      </p>
      <div class="flex gap-3">
        <button
          @click="$emit('close')"
          class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="$emit('delete')"
          class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ show: boolean }>();
const emit = defineEmits(["close", "delete"] as const);
</script>
