<template>
  <div class="rounded-xl border border-border bg-panel/50 p-4">
    <p class="text-sm text-muted">{{ title }}</p>
    <p class="mt-2 text-2xl font-semibold text-bright">{{ value }}</p>
    <p class="mt-1 text-xs text-blue-400">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  note: string;
}>();
</script>
