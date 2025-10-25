<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-white/10 px-6 py-4">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <Icon name="mdi:account-circle" class="h-6 w-6 text-blue-400" />
        Profile Information
      </h2>
    </div>
    <div class="p-6 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >Email Address</label
        >
        <div class="flex items-center gap-3">
          <input
            type="email"
            :value="user?.email"
            disabled
            class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <button
            class="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            disabled
          >
            <Icon name="mdi:pencil" class="h-5 w-5" />
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">Email cannot be changed</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >Display Name</label
        >
        <div class="flex items-center gap-3">
          <input
            :value="displayName"
            @input="$emit('update:displayName', $event.target.value)"
            type="text"
            placeholder="Enter your display name"
            class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            @click="$emit('save')"
            :disabled="saving"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            {{ saving ? "Saving..." : "Save" }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >User ID</label
        >
        <div class="flex items-center gap-3">
          <input
            type="text"
            :value="user?.id"
            disabled
            class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-60 font-mono text-sm"
          />
          <button
            @click="$emit('copy-user-id')"
            class="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            title="Copy User ID"
          >
            <Icon name="mdi:content-copy" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: any;
  displayName: string;
  saving: boolean;
}>();
const emit = defineEmits([
  "update:displayName",
  "save",
  "copy-user-id",
] as const);
</script>
