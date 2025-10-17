import { createWeb3Modal } from "@web3modal/wagmi";
import { http, createConfig } from "@wagmi/core";
import { mainnet, polygon, arbitrum, optimism, base } from "@wagmi/core/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import type { Config } from "@wagmi/core";

export const useWeb3Auth = () => {
  const { signIn, signUp } = useSupabase();

  // WalletConnect Project ID - Get from https://cloud.walletconnect.com
  const projectId = "72ae44cd011e6a756e418f27daadd54c";

  // Create wagmi config
  const config: Config = createConfig({
    chains: [mainnet, polygon, arbitrum, optimism, base],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [arbitrum.id]: http(),
      [optimism.id]: http(),
      [base.id]: http(),
    },
    connectors: [
      injected({ shimDisconnect: true }),
      walletConnect({ projectId, showQrModal: false }),
      coinbaseWallet({ appName: "Crypto Portfolio Tracker" }),
    ],
  });

  // Create Web3Modal instance
  let modal: ReturnType<typeof createWeb3Modal> | null = null;

  const initModal = () => {
    if (typeof window !== "undefined" && !modal) {
      modal = createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: false,
        themeMode: "dark",
        themeVariables: {
          "--w3m-accent": "#3b82f6",
          "--w3m-border-radius-master": "12px",
        },
      });
    }
    return modal;
  };

  // Connect wallet
  const connectWallet = async (): Promise<string> => {
    try {
      initModal();
      modal?.open();

      const { watchAccount } = await import("@wagmi/core/actions");

      return new Promise<string>((resolve, reject) => {
        const unwatch = watchAccount(config, {
          onChange: async (account) => {
            if (account.address) {
              unwatch();
              resolve(account.address);
            }
          },
        });

        // Timeout after 60 seconds
        setTimeout(() => {
          unwatch();
          reject(new Error("Connection timeout"));
        }, 60000);
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  };

  // Sign message for authentication
  const signAuthMessage = async (address: string) => {
    const message = `Sign this message to authenticate with Crypto Portfolio Tracker.\n\nAddress: ${address}\nTimestamp: ${Date.now()}`;

    try {
      const { signMessage } = await import("@wagmi/core/actions");
      const signature = await signMessage(config, {
        message,
      });
      return { message, signature };
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  };

  // Authenticate with Supabase using wallet signature
  const authenticateWithWallet = async () => {
    try {
      // 1. Connect wallet
      const address = await connectWallet();
      if (!address) {
        throw new Error("No wallet connected");
      }

      // 2. Sign authentication message
      const { message, signature } = await signAuthMessage(address);

      // 3. Verify signature on backend (you'll need to implement this)
      // For now, we'll create/login user with wallet address as email
      const walletEmail = `${address.toLowerCase()}@wallet.local`;

      // 4. Check if user exists, if not create account
      const { data: existingUser } = await signIn(walletEmail, address);

      if (!existingUser) {
        // User doesn't exist, create account
        const { error: signUpError } = await signUp(walletEmail, address);

        if (
          signUpError &&
          !signUpError.message.includes("already registered")
        ) {
          throw signUpError;
        }

        // Login after signup
        const { error: signInError } = await signIn(walletEmail, address);
        if (signInError) throw signInError;
      }

      return {
        address,
        signature,
        message,
      };
    } catch (error) {
      console.error("Error authenticating with wallet:", error);
      throw error;
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      const { disconnect } = await import("@wagmi/core/actions");
      await disconnect(config);
      modal?.close();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      throw error;
    }
  };

  // Get current account
  const getCurrentAccount = async () => {
    const { getAccount } = await import("@wagmi/core/actions");
    return getAccount(config);
  };

  return {
    config,
    initModal,
    connectWallet,
    disconnectWallet,
    authenticateWithWallet,
    getCurrentAccount,
    signAuthMessage,
  };
};
