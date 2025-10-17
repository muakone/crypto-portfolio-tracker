<template>
  <NuxtLayout>
    <div class="max-w-xl mx-auto py-24 text-center space-y-4">
      <h1 class="text-4xl font-bold">Something went wrong</h1>
      <p class="text-gray-400">
        {{ error?.message || "An unexpected error occurred." }}
      </p>
      <UButton color="primary" @click="handleError">Go back home</UButton>
    </div>
  </NuxtLayout>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    default: () => null,
  },
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
