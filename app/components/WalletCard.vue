<template>
  <div
    class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-panel/60 p-5 text-center"
  >
    <img :src="logo" :alt="title" class="h-12 w-12 object-contain" />
    <div class="text-sm text-muted">{{ title }}</div>
    <button
      class="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a59] to-[#ff3fb8] px-4 py-2 text-xs font-semibold text-white"
    >
      Connect <Icon name="mdi:arrow-right" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  logo: string;
}>();
</script>
