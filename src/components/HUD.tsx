import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Battery, Wind, Brain, Map } from 'lucide-react';
import { motion } from 'motion/react';

export const HUD: React.FC = () => {
  const { battery, oxygen, sanity, x, y, signalsDecoded } = useGameStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-4"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <StatBar icon={<Battery size={16} />} value={battery} color="bg-yellow-500" />
          <StatBar icon={<Wind size={16} />} value={oxygen} color="bg-cyan-500" />
          <StatBar icon={<Brain size={16} />} value={sanity} color="bg-fuchsia-500" />
        </div>
        <div className="text-right text-zinc-400 font-mono text-xs">
          <div>LOC: {Math.round(x)}, {Math.round(y)}</div>
          <div className="text-cyan-400">SIG_DEC: {signalsDecoded}</div>
        </div>
      </div>
      
      <div className="text-center pb-8 opacity-50 text-xs tracking-widest text-zinc-500 uppercase">
        Tap & Hold to Pulse • Drag to Move
      </div>
    </motion.div>
  );
};

const StatBar = ({ icon, value, color }: { icon: React.ReactNode, value: number, color: string }) => (
  <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-md border border-zinc-800 pointer-events-auto">
    <div className="text-zinc-500">{icon}</div>
    <div className="w-24 h-2 bg-zinc-950 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${Math.max(0, value)}%` }} />
    </div>
  </div>
);
