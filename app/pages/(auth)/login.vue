<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-12 relative overflow-hidden"
  >
    <!-- Animated Background Blobs -->
    <div
      class="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
    />
    <div
      class="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"
    />

    <AuthCard
      v-model:password="password"
      v-model:email="email"
      :is-login="isLogin"
      :loading="loading"
      :error-message="errorMessage"
      :success-message="successMessage"
      @submit="handleSubmit"
      @toggle-mode="toggleMode"
      @forgot-password="handleForgotPassword"
      @web3="handleWeb3Auth"
      @social-auth="handleSocialAuth"
    />
  </div>
</template>

<script setup lang="ts">
import AuthCard from "~/components/AuthCard.vue";
import { useAuthForm } from "~/composables/useAuthForm";

defineOptions({ name: "LoginPage" });

const {
  isLogin,
  email,
  password,
  loading,
  errorMessage,
  successMessage,
  toggleMode,
  handleForgotPassword,
  handleWeb3Auth,
  handleSocialAuth,
  handleSubmit,
} = useAuthForm(true, true);

useHead({ title: "Login - Crypto Portfolio Tracker" });
definePageMeta({ layout: "default" });
</script>
