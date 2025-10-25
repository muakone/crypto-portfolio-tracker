<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
  >
    <div class="border-b border-white/10 px-6 py-4">
      <h2 class="text-xl font-semibold text-white flex items-center gap-2">
        <Icon name="mdi:bell" class="h-6 w-6 text-yellow-400" /> Notifications
      </h2>
    </div>
    <div class="p-6 space-y-4">
      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Email Notifications</p>
          <p class="text-sm text-gray-400">
            Receive portfolio updates via email
          </p>
        </div>
        <button
          @click="$emit('update:emailNotifications', !emailNotifications)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            emailNotifications ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              emailNotifications && 'translate-x-7',
            ]"
          />
        </button>
      </div>

      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Price Alerts</p>
          <p class="text-sm text-gray-400">
            Get notified when prices hit your targets
          </p>
        </div>
        <button
          @click="$emit('update:priceAlerts', !priceAlerts)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            priceAlerts ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              priceAlerts && 'translate-x-7',
            ]"
          />
        </button>
      </div>

      <div
        class="flex items-center justify-between py-3 border-b border-white/5"
      >
        <div>
          <p class="font-medium text-white">Transaction Updates</p>
          <p class="text-sm text-gray-400">Notify me of new transactions</p>
        </div>
        <button
          @click="$emit('update:transactionUpdates', !transactionUpdates)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            transactionUpdates ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              transactionUpdates && 'translate-x-7',
            ]"
          />
        </button>
      </div>

      <div class="flex items-center justify-between py-3">
        <div>
          <p class="font-medium text-white">Weekly Summary</p>
          <p class="text-sm text-gray-400">Get a weekly portfolio report</p>
        </div>
        <button
          @click="$emit('update:weeklySummary', !weeklySummary)"
          :class="[
            'relative w-14 h-7 rounded-full transition-colors',
            weeklySummary ? 'bg-blue-600' : 'bg-white/10',
          ]"
        >
          <span
            :class="[
              'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
              weeklySummary && 'translate-x-7',
            ]"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  emailNotifications: boolean;
  priceAlerts: boolean;
  transactionUpdates: boolean;
  weeklySummary: boolean;
}>();
const emit = defineEmits([
  "update:emailNotifications",
  "update:priceAlerts",
  "update:transactionUpdates",
  "update:weeklySummary",
] as const);
</script>
