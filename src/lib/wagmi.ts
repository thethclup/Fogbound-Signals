import { createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
