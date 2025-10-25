import { ref } from "vue";
import { useRouter } from "#imports";
import { useSupabase } from "~/composables/useSupabase";

export function useAuthForm(initialIsLogin = true, prefillDemo = false) {
  const { signIn, signUp, signInWithOAuth } = useSupabase();
  const router = useRouter();

  const isLogin = ref(initialIsLogin);
  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMessage = ref("");
  const successMessage = ref("");

  // Demo credentials (can be prefilled on the login page)
  const demoCredentials = {
    email: "test02@yopmail.com",
    password: "test12345",
  };

  const fillDemoCredentials = () => {
    email.value = demoCredentials.email;
    password.value = demoCredentials.password;
  };

  // Optionally prefill when the composable is created (used on login page)
  if (prefillDemo && isLogin.value) {
    fillDemoCredentials();
  }

  const toggleMode = () => {
    isLogin.value = !isLogin.value;
    errorMessage.value = "";
    successMessage.value = "";
    // navigate to the canonical route for the new mode
    if (isLogin.value) {
      router.push("/login");
    } else {
      router.push("/signup");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleWeb3Auth = async () => {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    try {
      if (import.meta.client) {
        const { useWeb3Auth } = await import("~/composables/useWeb3Auth");
        const { authenticateWithWallet } = useWeb3Auth();

        const result = await authenticateWithWallet();

        if (result && result.address) {
          successMessage.value = `Connected: ${result.address.slice(
            0,
            6
          )}...${result.address.slice(-4)}`;
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      }
    } catch (err: unknown) {
      errorMessage.value =
        err instanceof Error ? err.message : "Failed to connect wallet";
    } finally {
      loading.value = false;
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    loading.value = true;
    errorMessage.value = "";

    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        errorMessage.value = error.message;
      }
    } catch (err: unknown) {
      errorMessage.value =
        err instanceof Error ? err.message : "An error occurred";
    } finally {
      loading.value = false;
    }
  };

  const handleSubmit = async () => {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    try {
      if (isLogin.value) {
        const { error } = await signIn(email.value, password.value);
        if (error) {
          errorMessage.value = error.message;
        } else {
          successMessage.value = "Login successful! Redirecting...";
          setTimeout(() => router.push("/dashboard"), 1000);
        }
      } else {
        const { error } = await signUp(email.value, password.value);
        if (error) {
          errorMessage.value = error.message;
        } else {
          successMessage.value =
            "Account created! Please check your email to verify.";
          email.value = "";
          password.value = "";
          setTimeout(() => {
            isLogin.value = true;
            successMessage.value = "";
            router.push("/login");
          }, 3000);
        }
      }
    } catch (err: unknown) {
      errorMessage.value =
        err instanceof Error ? err.message : "An error occurred";
    } finally {
      loading.value = false;
    }
  };

  return {
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
    // demo helpers
    demoCredentials,
    fillDemoCredentials,
  };
}
