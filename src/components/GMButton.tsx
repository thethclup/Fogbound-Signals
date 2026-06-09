import React from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Sun } from 'lucide-react';
import { generateAttributionData, BASE_BUILDER_CODE } from '../lib/erc8021';

export function GMButton() {
  const { isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  
  if (!isConnected) return null;

  const handleGM = () => {
    const calldata = generateAttributionData('0x', BASE_BUILDER_CODE);

    sendTransaction({
      to: '0xc35B9997B63B1CE14f8F513f7eddD9a7ABbB33d7',
      data: calldata as `0x${string}`,
      value: parseEther('0'),
    });
  };

  return (
    <button
      onClick={handleGM}
      disabled={isPending}
      className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
    >
      <Sun size={14} className={isPending ? 'animate-spin' : ''} />
      {isPending ? 'Sending...' : isSuccess ? 'GM Sent!' : 'Say GM'}
    </button>
  );
}
