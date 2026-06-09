import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { WalletConnect } from './Web3Provider';
import { Radio } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const setScreen = useGameStore(s => s.setScreen);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center p-6 z-50">
      
      {/* Immersive Volumetric Fog Background */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-900 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="text-center z-10"
      >
        <motion.div
           animate={{ opacity: [0.3, 1, 0.4] }}
           transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Radio className="w-16 h-16 text-cyan-700 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(8,145,178,0.5)]" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-['Cinzel'] tracking-widest text-zinc-300 drop-shadow-lg mb-4 uppercase">
          Fogbound
          <br/>
          <span className="text-cyan-800 drop-shadow-[0_0_20px_rgba(8,145,178,0.6)] font-bold">Signals</span>
        </h1>
        <p className="text-zinc-600 font-mono tracking-[0.3em] text-xs mb-16 uppercase drop-shadow-sm">
          Base Mainnet Expedition
        </p>

        <button 
          onClick={() => setScreen('game')}
          className="relative px-10 py-4 bg-transparent border-2 border-zinc-700 text-zinc-300 font-bold uppercase tracking-[0.2em] rounded-sm hover:border-cyan-700 hover:text-cyan-400 hover:bg-cyan-950/20 transition-all duration-500 overflow-hidden group"
        >
          <div className="absolute inset-0 w-full h-full bg-cyan-900/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          <span className="relative font-['Cinzel'] text-sm">Enter the Wasteland</span>
        </button>

        <div className="mt-12 flex gap-8 justify-center">
           <button onClick={() => setScreen('leaderboard')} className="text-xs font-mono text-zinc-600 hover:text-cyan-600 transition-colors uppercase tracking-widest">
             Records
           </button>
           <button onClick={() => setScreen('archives')} className="text-xs font-mono text-zinc-600 hover:text-amber-600 transition-colors uppercase tracking-widest">
             Archives
           </button>
        </div>
      </motion.div>
    </div>
  );
};
