import React from 'react';
import { WagmiProvider, useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from '../lib/wagmi';
import { generateAttributionData, BASE_BUILDER_CODE } from '../lib/erc8021';
import { encodeAgentAuthorization } from '../lib/erc8004';
import { parseEther } from 'viem';

export const Web3Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button 
        onClick={() => disconnect()}
        className="px-4 py-2 border border-zinc-700 rounded text-xs font-mono text-zinc-400 hover:text-white"
      >
        {address?.slice(0,6)}...{address?.slice(-4)}
      </button>
    );
  }

  const injected = connectors.find(c => c.id === 'injected');

  return (
    <button 
      onClick={() => injected && connect({ connector: injected })}
      className="px-4 py-2 border border-cyan-900 bg-cyan-950/30 text-cyan-400 rounded text-xs font-mono hover:bg-cyan-900/50"
    >
      Connect Wallet
    </button>
  );
};
