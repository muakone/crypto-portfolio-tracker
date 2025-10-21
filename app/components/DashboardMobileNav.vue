<template>
  <!-- Mobile Navbar (Sticky at top for screens < 1024px) -->
  <nav
    class="lg:hidden sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl"
  >
    <div class="flex h-16 items-center justify-between px-4">
      <!-- Page Title -->
      <h1 class="text-lg font-bold text-white truncate">{{ pageTitle }}</h1>

      <!-- Hamburger Menu Button -->
      <button
        aria-label="Open menu"
        class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
        @click="$emit('toggle-sidebar')"
      >
        <Icon name="mdi:menu" class="h-6 w-6" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();

defineEmits<{
  (e: "toggle-sidebar"): void;
}>();
</script>
