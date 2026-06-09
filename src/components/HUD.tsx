import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Battery, Wind, Brain, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const HUD: React.FC = () => {
  const { battery, oxygen, sanity, x, y, signalsDecoded } = useGameStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-3 font-mono">
          <StatBar icon={<Battery size={14} />} label="PWR" value={battery} color="bg-amber-600" />
          <StatBar icon={<Wind size={14} />} label="O2" value={oxygen} color="bg-cyan-600" />
          <StatBar icon={<Brain size={14} />} label="COG" value={sanity} color="bg-fuchsia-800" />
        </div>
        <div className="text-right text-zinc-500 font-mono text-[10px] tracking-widest bg-[#050505]/80 p-3 rounded-sm border border-zinc-800 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="mb-1 text-zinc-600 uppercase">SYS_COORD</div>
          <div className="text-zinc-300">X.{Math.round(x).toString().padStart(4, '0')}</div>
          <div className="text-zinc-300">Y.{Math.round(y).toString().padStart(4, '0')}</div>
          <div className="h-px w-full bg-zinc-800 my-2" />
          <div className="flex items-center gap-2 justify-end text-cyan-600">
             <Activity size={12} className="animate-pulse" />
             <span>DAT: {signalsDecoded.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center pb-8 opacity-40 font-['Cinzel'] tracking-[0.2em] text-xs text-zinc-400 capitalize">
        [ Press & hold to pulse ] — [ Drag to navigate ]
      </div>
    </motion.div>
  );
};

const StatBar = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div className="flex items-center gap-3 bg-[#050505]/60 backdrop-blur-md p-2 rounded-sm border border-zinc-800 pointer-events-auto">
    <div className={`text-zinc-500 w-4`}>{icon}</div>
    <span className="text-[9px] text-zinc-500 w-6">{label}</span>
    <div className="w-24 h-[3px] bg-zinc-900 overflow-hidden relative">
      <div className={`absolute top-0 left-0 h-full ${color} transition-all duration-300 shadow-[0_0_8px_currentColor] ${value < 20 ? 'animate-pulse' : ''}`} style={{ width: `${Math.max(0, value)}%` }} />
    </div>
  </div>
);
