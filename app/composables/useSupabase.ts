import type { SupabaseClient } from "@supabase/supabase-js";
import type { TokenRecord } from "~~/shared/types";

export const useSupabase = () => {
  const { $supabase } = useNuxtApp();

  const supabase = $supabase as SupabaseClient;

  if (!supabase) {
    throw new Error("Supabase client is not initialized");
  }

  // Auth functions
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const signInWithOAuth = async (provider: "google" | "github") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  };

  // Wallet functions
  const addWallet = async (
    userId: string,
    address: string,
    chain: string = "ethereum"
  ) => {
    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: new Error("User not authenticated") };
    }

    // Use the authenticated user's ID instead of the passed userId
    const { data, error } = await supabase
      .from("wallets")
      .insert([{ user_id: user.id, address, chain }])
      .select();

    if (error) {
      console.error("Supabase addWallet error:", error);
    }

    return { data, error };
  };

  const getWallets = async (userId: string) => {
    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", userId);
    return { data, error };
  };

  const deleteWallet = async (walletId: string) => {
    const { error } = await supabase
      .from("wallets")
      .delete()
      .eq("id", walletId);
    return { error };
  };

  // Token functions
  const saveTokens = async (walletId: string, tokens: TokenRecord[]) => {
    const { data, error } = await supabase
      .from("tokens")
      .upsert(
        tokens.map((token: TokenRecord) => ({
          wallet_id: walletId,
          symbol: token.symbol,
          balance: token.balance,
          usd_value: token.usd_value,
          last_updated: new Date().toISOString(),
        }))
      )
      .select();
    return { data, error };
  };

  const getTokens = async (walletId: string) => {
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .eq("wallet_id", walletId)
      .order("usd_value", { ascending: false });
    return { data, error };
  };

  return {
    supabase,
    signUp,
    signIn,
    signOut,
    signInWithOAuth,
    getUser,
    getSession,
    addWallet,
    getWallets,
    deleteWallet,
    saveTokens,
    getTokens,
  };
};
