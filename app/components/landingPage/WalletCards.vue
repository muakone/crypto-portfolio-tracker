<template>
  <template v-if="heroWallets && heroWallets.length">
    <div
      v-for="(w, idx) in heroWallets"
      :key="w.title"
      class="group relative"
      data-aos="fade-up"
      :data-aos-delay="600 + idx * 100"
    >
      <div
        class="relative h-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-indigo-600/0 opacity-0 transition-all duration-300 group-hover:from-blue-600/10 group-hover:via-purple-600/5 group-hover:to-indigo-600/10 group-hover:opacity-100"
        ></div>

        <div class="relative flex flex-col items-center space-y-4">
          <div class="relative">
            <div
              class="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
            <img
              :src="w.logo"
              :alt="w.title"
              class="relative h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110 group-hover:animate-float"
            />
          </div>

          <div
            class="text-center font-semibold text-slate-200 transition-colors group-hover:text-white"
          >
            {{ w.title }}
          </div>

          <button
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600/10 px-4 py-2.5 text-sm font-semibold text-blue-300 transition-all hover:bg-blue-600/20 group-hover:bg-blue-600/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Connect
          </button>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  heroWallets: { title: string; logo: string }[];
}>();
</script>

<style scoped></style>
