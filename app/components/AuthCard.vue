<template>
  <div class="w-full max-w-md relative z-10" data-aos="fade-up">
    <!-- Auth Card -->
    <div
      class="bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10"
    >
      <!-- Header / Logo -->
      <div class="text-center mb-8" data-aos="fade-down" data-aos-delay="100">
        <div class="inline-flex items-center justify-center mb-4">
          <div
            class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
              />
            </svg>
          </div>
        </div>

        <h2 class="text-3xl sm:text-4xl font-bold mb-2">
          <span
            class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {{ isLogin ? "Welcome Back" : "Create Account" }}
          </span>
        </h2>
        <p class="text-gray-400 text-sm">
          {{
            isLogin
              ? "Sign in to manage your crypto portfolio"
              : "Start tracking your crypto journey"
          }}
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mb-6 p-4 bg-red-500/20 backdrop-blur border border-red-500/50 rounded-xl text-red-200 text-sm flex items-start gap-3"
        data-aos="shake"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 flex-shrink-0 mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-6 p-4 bg-green-500/20 backdrop-blur border border-green-500/50 rounded-xl text-green-200 text-sm flex items-start gap-3"
        data-aos="fade-in"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 flex-shrink-0 mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ successMessage }}</span>
      </div>

      <!-- Auth Form -->
      <form class="space-y-5" @submit.prevent="emitSubmit">
        <div data-aos="fade-up" data-aos-delay="200">
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Email Address</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
            <input
              :value="email"
              @input="(e) => emitUpdateEmail((e.target as HTMLInputElement).value)"
              type="email"
              required
              class="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="300">
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              :value="password"
              @input="(e) => emitUpdatePassword(e.target && (e.target as HTMLInputElement).value || '')"
              type="password"
              required
              minlength="6"
              class="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Forgot Password Link (only show on login) -->
        <div v-if="isLogin" class="flex justify-end">
          <button
            type="button"
            class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            @click="$emit('forgot-password')"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-0.5"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg
              class="animate-spin h-5 w-5"
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
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
          <span v-else>{{ isLogin ? "Sign In" : "Create Account" }}</span>
        </button>
      </form>

      <!-- Toggle Login/Signup -->
      <div class="mt-8 text-center" data-aos="fade-up" data-aos-delay="500">
        <button
          class="text-sm text-gray-400 hover:text-white transition-colors"
          @click="$emit('toggle-mode')"
        >
          {{
            isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"
          }}
        </button>
      </div>

      <!-- Divider -->
      <div class="relative my-8" data-aos="fade-up" data-aos-delay="600">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-slate-900/50 text-gray-400"
            >Or continue with</span
          >
        </div>
      </div>

      <!-- Social & Web3 Auth Buttons -->
      <div class="space-y-4">
        <button
          type="button"
          class="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/50 rounded-xl text-white transition-all duration-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 group"
          data-aos="fade-up"
          data-aos-delay="700"
          @click="$emit('web3')"
        >
          <img
            src="/assets/img/metamask-icon.svg"
            alt="MetaMask"
            class="h-6 w-6 group-hover:scale-110 transition-transform"
          />
          <span class="font-semibold">Connect Web3 Wallet</span>
          <span
            class="text-xs bg-blue-500/20 px-2 py-0.5 rounded-full text-blue-300"
            >MetaMask, WalletConnect</span
          >
        </button>

        <div
          class="grid grid-cols-2 gap-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-gray-300 transition-all duration-200 hover:border-slate-600"
            @click="$emit('social-auth', 'google')"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="text-sm font-medium">Google</span>
          </button>

          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-gray-300 transition-all duration-200 hover:border-slate-600"
            @click="$emit('social-auth', 'github')"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span class="text-sm font-medium">GitHub</span>
          </button>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-8 text-center" data-aos="fade-up" data-aos-delay="900">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
  isLogin: boolean;
  email: string;
  password: string;
  loading: boolean;
  errorMessage: string;
  successMessage: string;
}>();

const emit = defineEmits<{
  (e: "update:email" | "update:password", v: string): void;
  (e: "submit" | "toggle-mode" | "forgot-password" | "web3"): void;
  (e: "social-auth", provider: "google" | "github"): void;
}>();

function emitUpdateEmail(v: string) {
  emit("update:email", v);
}
function emitUpdatePassword(v: string) {
  emit("update:password", v);
}
function emitSubmit() {
  emit("submit");
}
</script>
