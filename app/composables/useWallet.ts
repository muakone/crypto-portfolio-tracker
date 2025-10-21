import { BrowserProvider } from "ethers";

// Type for window.ethereum
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  selectedAddress?: string | null;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const useWallet = () => {
  const connected = ref(false);
  const address = ref<string | null>(null);
  const balance = ref<string>("0");
  const error = ref<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = (): boolean => {
    if (typeof window === "undefined") return false;
    return typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      error.value =
        "MetaMask is not installed. Please install MetaMask extension.";
      return null;
    }

    try {
      const ethereum = window.ethereum;
      if (!ethereum) {
        throw new Error("Ethereum provider not found");
      }
      const provider = new BrowserProvider(ethereum);

      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        address.value = accounts[0];
        connected.value = true;

        // Get balance
        const balanceWei = await provider.getBalance(accounts[0]);
        balance.value = (Number(balanceWei) / 1e18).toFixed(4);

        return accounts[0];
      }

      return null;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      error.value = errorMessage;
      console.error("Error connecting to MetaMask:", err);
      return null;
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    connected.value = false;
    address.value = null;
    balance.value = "0";
  };

  // Get ETH balance for any address
  const getEthBalance = async (walletAddress: string): Promise<number> => {
    try {
      const config = useRuntimeConfig();
      const apiKey = config.public.etherscanApiKey;

      console.log("Fetching ETH balance for:", walletAddress);
      console.log("API Key exists:", apiKey ? "Yes" : "No");

      if (typeof window === "undefined" || !isMetaMaskInstalled()) {
        // Fallback to Etherscan API v2 if MetaMask not available
        const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`;
        console.log("Calling Etherscan API v2...");

        const response = await fetch(url);
        const data = await response.json();

        console.log("Etherscan response:", data);

        if (data.status === "0") {
          console.error("Etherscan API error:", data.message, data.result);
          throw new Error(data.message || "Etherscan API error");
        }

        const balance = Number(data.result) / 1e18;
        console.log("ETH Balance:", balance);
        return balance;
      }

      const ethereum = window.ethereum;
      if (!ethereum) {
        throw new Error("Ethereum provider not found");
      }
      const provider = new BrowserProvider(ethereum);
      const balanceWei = await provider.getBalance(walletAddress);
      return Number(balanceWei) / 1e18;
    } catch (err) {
      console.error("Error fetching ETH balance:", err);
      return 0;
    }
  };

  // Get ERC-20 token balances for an Ethereum address
  const getERC20Tokens = async (
    walletAddress: string
  ): Promise<Array<{ symbol: string; balance: number; name: string }>> => {
    try {
      const config = useRuntimeConfig();
      const apiKey = config.public.etherscanApiKey;

      console.log("Fetching ERC-20 tokens for:", walletAddress);

      // Fetch token transfers to identify which tokens the address holds
      const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${apiKey}`;
      console.log("Calling Etherscan tokentx API v2...");

      const response = await fetch(url);
      const data = await response.json();

      console.log("Etherscan tokentx response status:", data.status);
      console.log("Etherscan tokentx message:", data.message);

      if (data.status === "0") {
        if (data.message === "No transactions found") {
          console.warn("No ERC-20 token transactions found");
          return [];
        }
        console.warn("No ERC-20 tokens found or API error:", data.message);
        return [];
      }

      if (!data.result || data.result.length === 0) {
        console.warn("Empty result from tokentx API");
        return [];
      }

      console.log(`Found ${data.result.length} token transactions`);

      // Spam filter: known scam patterns
      const isSpamToken = (symbol: string, name: string) => {
        const lowerSymbol = symbol.toLowerCase();
        const lowerName = name.toLowerCase();

        // Filter out common spam patterns
        const spamPatterns = [
          "visit",
          "claim",
          "reward",
          "airdrop",
          "free",
          "bonus",
          ".com",
          ".net",
          ".org",
          "http",
          "www",
          "u5dt",
          "ercai",
          "superx",
          "eꓔh", // fake token symbols
        ];

        // Check if contains spam patterns
        for (const pattern of spamPatterns) {
          if (lowerSymbol.includes(pattern) || lowerName.includes(pattern)) {
            return true;
          }
        }

        // Filter out unicode lookalike characters (fake USDT, fake ETH, etc.)
        // Real tokens should only use ASCII characters
        // eslint-disable-next-line no-control-regex
        const hasNonASCII = /[^\x00-\x7F]/.test(symbol);
        if (hasNonASCII) {
          return true;
        }

        return false;
      };

      // Get unique token contracts (excluding spam)
      const uniqueTokens = new Map<
        string,
        { symbol: string; name: string; decimals: number }
      >();

      for (const tx of data.result) {
        if (tx.tokenSymbol && tx.contractAddress) {
          // Skip spam tokens
          if (isSpamToken(tx.tokenSymbol, tx.tokenName || "")) {
            continue;
          }

          uniqueTokens.set(tx.contractAddress, {
            symbol: tx.tokenSymbol,
            name: tx.tokenName || tx.tokenSymbol,
            decimals: parseInt(tx.tokenDecimal) || 18,
          });
        }
      }

      console.log(`Found ${uniqueTokens.size} unique ERC-20 tokens`);

      // LIMIT: Only check the most recent 50 tokens (avoid checking hundreds of tokens)
      const maxTokensToCheck = 50;
      const tokensToCheck = Array.from(uniqueTokens.entries()).slice(
        -maxTokensToCheck
      ); // Get last 50 (most recent)

      if (uniqueTokens.size > maxTokensToCheck) {
        console.log(
          `Wallet has ${uniqueTokens.size} tokens. Checking only the most recent ${maxTokensToCheck} tokens.`
        );
      }

      // Fetch current balance for each token
      const tokenBalances = [];

      let checkedCount = 0;
      for (const [contractAddress, tokenInfo] of tokensToCheck) {
        try {
          checkedCount++;
          console.log(
            `[${checkedCount}/${tokensToCheck.length}] Checking balance for ${tokenInfo.symbol}...`
          );

          const balanceResponse = await fetch(
            `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${walletAddress}&tag=latest&apikey=${apiKey}`
          );
          const balanceData = await balanceResponse.json();

          // Reduced logging - only show if balance > 0
          if (
            balanceData.status === "1" &&
            balanceData.result &&
            BigInt(balanceData.result) > 0
          ) {
            console.log(`${tokenInfo.symbol} balance response:`, balanceData);
          }

          if (balanceData.status === "1" && balanceData.result) {
            const rawBalance = BigInt(balanceData.result);
            const balance =
              Number(rawBalance) / Math.pow(10, tokenInfo.decimals);

            console.log(`${tokenInfo.symbol} balance:`, balance);

            // Only include tokens with non-zero balance
            if (balance > 0) {
              tokenBalances.push({
                symbol: tokenInfo.symbol,
                name: tokenInfo.name,
                balance: balance,
              });
            }
          }
        } catch (err) {
          console.error(`Error fetching balance for ${tokenInfo.symbol}:`, err);
        }
      }

      console.log(`Retrieved balances for ${tokenBalances.length} tokens`);
      return tokenBalances;
    } catch (err) {
      console.error("Error fetching ERC-20 tokens:", err);
      return [];
    }
  };

  // Get all tokens for an Ethereum wallet (ETH + ERC-20 tokens)
  const getAllEthTokens = async (
    walletAddress: string
  ): Promise<Array<{ symbol: string; balance: number; name: string }>> => {
    const tokens = [];

    // Get ETH balance
    const ethBalance = await getEthBalance(walletAddress);
    if (ethBalance > 0) {
      tokens.push({
        symbol: "ETH",
        name: "Ethereum",
        balance: ethBalance,
      });
    }

    // Get ERC-20 tokens from transaction history
    const erc20Tokens = await getERC20Tokens(walletAddress);
    tokens.push(...erc20Tokens);

    // BONUS: Also check common stablecoins directly (in case no transactions exist)
    const commonTokens = [
      {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        symbol: "USDT",
        name: "Tether",
        decimals: 6,
      },
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
      },
      {
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
      },
    ];

    // Check each common token if not already found
    for (const token of commonTokens) {
      const alreadyFound = tokens.some((t) => t.symbol === token.symbol);
      if (!alreadyFound) {
        try {
          const config = useRuntimeConfig();
          const apiKey = config.public.etherscanApiKey;

          const response = await fetch(
            `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokenbalance&contractaddress=${token.address}&address=${walletAddress}&tag=latest&apikey=${apiKey}`
          );
          const data = await response.json();

          if (data.status === "1" && data.result) {
            const balance =
              Number(BigInt(data.result)) / Math.pow(10, token.decimals);
            if (balance > 0) {
              console.log(`Found ${token.symbol} via direct check: ${balance}`);
              tokens.push({
                symbol: token.symbol,
                name: token.name,
                balance: balance,
              });
            }
          }
        } catch (err) {
          console.error(`Error checking ${token.symbol}:`, err);
        }
      }
    }

    // DEDUPLICATE: Combine tokens with the same symbol
    const deduplicatedTokens: Array<{
      symbol: string;
      balance: number;
      name: string;
    }> = [];
    const symbolMap = new Map<string, { balance: number; name: string }>();

    for (const token of tokens) {
      const existing = symbolMap.get(token.symbol);
      if (existing) {
        // Sum up balances for duplicate symbols
        existing.balance += token.balance;
        console.log(
          `Merged duplicate ${token.symbol}: ${existing.balance} total`
        );
      } else {
        symbolMap.set(token.symbol, {
          balance: token.balance,
          name: token.name,
        });
      }
    }

    // Convert map back to array
    for (const [symbol, data] of symbolMap.entries()) {
      deduplicatedTokens.push({
        symbol,
        name: data.name,
        balance: data.balance,
      });
    }

    console.log(
      `Deduplicated: ${tokens.length} → ${deduplicatedTokens.length} unique tokens`
    );
    return deduplicatedTokens;
  };

  // Get transaction history for Ethereum
  const getEthTransactionHistory = async (
    walletAddress: string,
    limit: number = 50
  ) => {
    try {
      const config = useRuntimeConfig();
      const apiKey = config.public.etherscanApiKey;

      console.log("Fetching ETH transaction history...");

      const response = await fetch(
        `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${apiKey}`
      );
      const data = await response.json();

      interface EtherscanTransaction {
        hash: string;
        from: string;
        to: string;
        value: string;
        timeStamp: string;
        blockNumber: string;
        isError?: string;
        gasUsed?: string;
        gasPrice?: string;
      }

      if (data.status === "1" && data.result) {
        console.log(`Found ${data.result.length} transactions`);
        return (data.result as EtherscanTransaction[]).map((tx) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: Number(tx.value) / 1e18, // Convert from Wei to ETH
          timestamp: Number(tx.timeStamp) * 1000, // Convert to milliseconds
          blockNumber: Number(tx.blockNumber),
          isError: tx.isError === "1",
          gasUsed: Number(tx.gasUsed),
          gasPrice: Number(tx.gasPrice) / 1e18,
          type: "ETH",
        }));
      }

      return [];
    } catch (err) {
      console.error("Error fetching ETH transaction history:", err);
      return [];
    }
  };

  // Get transaction history for Bitcoin
  const getBtcTransactionHistory = async (
    btcAddress: string,
    limit: number = 50
  ) => {
    try {
      console.log("Fetching BTC transaction history...");

      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}/full?limit=${limit}`
      );
      const data = await response.json();

      interface BlockCypherInput {
        addresses?: string[];
      }

      interface BlockCypherOutput {
        addresses?: string[];
      }

      interface BlockCypherTransaction {
        hash: string;
        inputs?: BlockCypherInput[];
        outputs?: BlockCypherOutput[];
        total?: number;
        confirmed?: string;
        received?: string;
        block_height?: number;
        confirmations?: number;
      }

      if (data.txs) {
        console.log(`Found ${data.txs.length} transactions`);
        return (data.txs as BlockCypherTransaction[]).map((tx) => ({
          hash: tx.hash,
          from: tx.inputs?.[0]?.addresses?.[0] || "Unknown",
          to: tx.outputs?.[0]?.addresses?.[0] || "Unknown",
          value: (tx.total || 0) / 1e8, // Convert from satoshis to BTC
          timestamp: new Date(tx.confirmed || tx.received || "").getTime(),
          blockNumber: tx.block_height || 0,
          isError: false,
          confirmations: tx.confirmations || 0,
          type: "BTC",
        }));
      }

      return [];
    } catch (err) {
      console.error("Error fetching BTC transaction history:", err);
      return [];
    }
  };

  // Get transaction history for any wallet
  const getTransactionHistory = async (
    address: string,
    chain: string,
    limit: number = 50
  ) => {
    if (chain === "ethereum") {
      return await getEthTransactionHistory(address, limit);
    } else if (chain === "bitcoin") {
      return await getBtcTransactionHistory(address, limit);
    }
    return [];
  };

  // Get BTC balance (using BlockCypher API)
  const getBtcBalance = async (btcAddress: string): Promise<number> => {
    try {
      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}/balance`
      );
      const data = await response.json();
      // Convert satoshis to BTC
      return (data.balance || 0) / 1e8;
    } catch (err) {
      console.error("Error fetching BTC balance:", err);
      return 0;
    }
  };

  // Validate Ethereum address
  const isValidEthAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  // Validate Bitcoin address
  const isValidBtcAddress = (addr: string): boolean => {
    // Basic validation for BTC addresses
    return (
      /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr) ||
      /^bc1[a-z0-9]{39,59}$/.test(addr)
    );
  };

  return {
    connected,
    address,
    balance,
    error,
    isMetaMaskInstalled,
    connectMetaMask,
    disconnect,
    getEthBalance,
    getERC20Tokens,
    getAllEthTokens,
    getBtcBalance,
    isValidEthAddress,
    isValidBtcAddress,
    getEthTransactionHistory,
    getBtcTransactionHistory,
    getTransactionHistory,
  };
};
