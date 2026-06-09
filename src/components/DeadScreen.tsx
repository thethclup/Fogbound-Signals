import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useSendTransaction, useAccount } from 'wagmi';
import { generateAttributionData, BASE_BUILDER_CODE } from '../lib/erc8021';
import { GMButton } from './GMButton';

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
        className="bg-zinc-900 border border-red-900/50 p-8 rounded-sm max-w-md w-full text-center shadow-[0_0_50px_rgba(153,27,27,0.3)]"
      >
        <h2 className="text-4xl font-['Cinzel'] text-red-600 tracking-[0.2em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Signal Lost</h2>
        <p className="text-zinc-400 font-mono text-sm mb-8 tracking-widest uppercase">The mist consumes everything.</p>

        <div className="space-y-4 mb-8 text-left bg-[#050505] p-5 rounded-sm border border-zinc-800 font-mono text-xs text-zinc-300">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">MAX RANGE REACHED:</span> 
            <span>{Math.round(score)} M</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-zinc-500">DATA FRAGMENTS:</span> 
            <span className="text-cyan-500 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{signalsDecoded}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
             <div className="flex-1">
               <GMButton />
             </div>
             <button 
               onClick={handleRecordExpedition}
               disabled={isPending || isSuccess}
               className="flex-2 px-4 py-3 bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-800 text-cyan-400 font-['Cinzel'] text-xs font-bold uppercase rounded-sm transition-colors disabled:opacity-50"
             >
               {isSuccess ? 'Recorded' : isPending ? 'Transmitting...' : 'Record Transmission On-Chain'}
             </button>
          </div>

          <button 
            onClick={resetGame}
            className="w-full px-4 py-3 border-t border-zinc-800 text-zinc-500 hover:text-zinc-300 text-xs font-mono uppercase transition-colors"
          >
            Restart Expedition
          </button>
        </div>
      </motion.div>
    </div>
  );
};
