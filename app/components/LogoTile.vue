<template>
  <div class="flex flex-col items-center gap-2 rounded-xl bg-panel/30 p-3">
    <img :src="src" :alt="label" class="h-10 w-10 object-contain" />
    <div class="text-xs text-muted">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  label: string;
}>();
</script>
