<template>
  <header class="border-b border-white/10 bg-black/20 backdrop-blur-xl">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-2xl md:block hidden">👋</span>
              <div>
                <p class="text-sm text-gray-400">Welcome back,</p>
                <h1 class="text-2xl font-bold text-white">{{ userName }}</h1>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-400 mt-1">{{ greeting }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
            title="Share your portfolio"
          >
            <Icon name="mdi:share-variant" class="h-5 w-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const { getUser } = useSupabase();
const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await getUser();
});

// Get user's display name
const userName = computed(() => {
  const email = user.value?.email;
  if (!email) return "User";
  const local = email.split("@")[0] ?? "";
  if (!local) return "User";
  return local.charAt(0).toUpperCase() + local.slice(1);
});

// Dynamic greeting based on time of day
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! Ready to check your portfolio?";
  if (hour < 18) return "Good afternoon! Your crypto is looking good today.";
  return "Good evening! Time to review your investments.";
});
</script>
