<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-white/10 px-6 py-4">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <Icon name="mdi:currency-usd" class="h-6 w-6 text-green-400" /> Currency
        & Region
      </h2>
    </div>
    <div class="p-6 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >Default Currency</label
        >
        <select
          :value="defaultCurrency"
          @change="$emit('update:defaultCurrency', $event.target.value)"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2"
          >Timezone</label
        >
        <select
          :value="timezone"
          @change="$emit('update:timezone', $event.target.value)"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="UTC">UTC - Coordinated Universal Time</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Europe/Paris">Paris (CET)</option>
          <option value="Asia/Tokyo">Tokyo (JST)</option>
          <option value="Asia/Shanghai">Shanghai (CST)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ defaultCurrency: string; timezone: string }>();
const emit = defineEmits([
  "update:defaultCurrency",
  "update:timezone",
] as const);
</script>
