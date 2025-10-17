<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 mb-6"
      >
        <svg
          class="animate-spin h-8 w-8 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">
        Completing authentication...
      </h2>
      <p class="text-gray-400">Please wait while we sign you in</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "AuthCallbackPage" });
const { getSession } = useSupabase();
const router = useRouter();

onMounted(async () => {
  try {
    // Get the session after OAuth redirect
    const session = await getSession();

    if (session) {
      // Successfully authenticated, redirect to dashboard
      await router.push("/dashboard");
    } else {
      // No session found, redirect to login with error
      await router.push("/login?error=authentication_failed");
    }
  } catch (error) {
    console.error("Auth callback error:", error);
    await router.push("/login?error=authentication_failed");
  }
});

useHead({
  title: "Authenticating - Crypto Portfolio Tracker",
});
</script>
