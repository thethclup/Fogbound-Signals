import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { WalletConnect } from './Web3Provider';
import { Radio } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const setScreen = useGameStore(s => s.setScreen);

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 z-50">
      <div className="absolute top-4 right-4"><WalletConnect /></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <Radio className="w-16 h-16 text-cyan-500 mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl md:text-5xl tracking-tighter font-medium text-zinc-100 mb-2">
          FOGBOUND <span className="text-cyan-500">SIGNALS</span>
        </h1>
        <p className="text-zinc-500 font-mono tracking-widest text-sm mb-12 uppercase">
          Base Mainnet Expedition
        </p>

        <button 
          onClick={() => setScreen('game')}
          className="relative px-8 py-4 bg-zinc-100 text-zinc-900 font-bold uppercase tracking-widest rounded-sm hover:bg-cyan-400 transition-colors"
        >
          Enter the Fog
        </button>

        <div className="mt-8 flex gap-4 justify-center">
           <button onClick={() => setScreen('leaderboard')} className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase border-b border-transparent hover:border-zinc-500 pb-1">
             Leaderboard
           </button>
        </div>
      </motion.div>

      {/* VFX Fog */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </div>
  );
};
