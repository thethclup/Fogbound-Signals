import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useSendTransaction, useAccount } from 'wagmi';
import { generateAttributionData, BASE_BUILDER_CODE } from '../lib/erc8021';

export const DeadScreen: React.FC = () => {
  const { score, signalsDecoded, resetGame } = useGameStore();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const { address } = useAccount();

  const handleRecordExpedition = () => {
    if (!address) return alert("Please connect wallet first.");
    
    // Create zero-value transaction with Attribution payload
    // Sending to self as dummy contract simulation
    const data = generateAttributionData(`0xExpedition${score}S${signalsDecoded}`, BASE_BUILDER_CODE);
    sendTransaction({
      to: address,
      value: 0n,
      data
    });
  };

  return (
    <div className="fixed inset-0 bg-red-950/20 backdrop-blur-md flex flex-col items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-red-900/50 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl"
      >
        <h2 className="text-3xl text-red-500 tracking-widest uppercase mb-2">Signal Lost</h2>
        <p className="text-zinc-400 text-sm mb-8">The fog consumes everything eventually.</p>

        <div className="space-y-4 mb-8 text-left bg-zinc-950 p-4 rounded font-mono text-xs text-zinc-300">
          <div className="flex justify-between"><span>Distance Explored:</span> <span>{Math.round(score)}</span></div>
          <div className="flex justify-between"><span>Signals Decoded:</span> <span className="text-cyan-400">{signalsDecoded}</span></div>
        </div>

        <button 
          onClick={handleRecordExpedition}
          disabled={isPending || isSuccess}
          className="w-full mb-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold uppercase rounded transition-colors disabled:opacity-50"
        >
          {isSuccess ? 'Recorded On-Chain' : isPending ? 'Signing...' : 'Record Expedition (SIWE)'}
        </button>

        <button 
          onClick={resetGame}
          className="w-full px-4 py-3 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-bold uppercase rounded transition-colors"
        >
          Begin Anew
        </button>
      </motion.div>
    </div>
  );
};
