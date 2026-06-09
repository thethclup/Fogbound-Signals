import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { RadioReceiver, LogOut } from 'lucide-react';

export const Archives: React.FC = () => {
  const setScreen = useGameStore(s => s.setScreen);
  const signalsDecoded = useGameStore(s => s.signalsDecoded);

  return (
    <div className="fixed inset-0 bg-[#050505] p-6 z-40 overflow-y-auto">
      <div className="max-w-2xl mx-auto mt-20">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-4 mb-8">
          <h2 className="text-3xl font-['Cinzel'] tracking-widest text-zinc-300">
            Decoded <span className="text-amber-700">Archive</span>
          </h2>
          <button onClick={() => setScreen('title')} className="text-zinc-600 hover:text-zinc-300">
            <LogOut size={24} />
          </button>
        </div>

        <p className="font-mono text-zinc-500 text-sm mb-6">
          TOTAL SIGNALS DECODED: {signalsDecoded}
        </p>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 border ${i < signalsDecoded ? 'border-cyan-900/50 bg-cyan-950/10' : 'border-zinc-800/50 bg-zinc-900/10'} rounded-sm flex items-start gap-4`}
            >
              <RadioReceiver className={`mt-1 ${i < signalsDecoded ? 'text-cyan-600' : 'text-zinc-700'}`} size={20} />
              <div>
                <h3 className={`font-['Space_Grotesk'] tracking-widest font-bold ${i < signalsDecoded ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {i < signalsDecoded ? `ECHO FRAGMENT #${1042 + i}` : 'CORRUPTED DATA'}
                </h3>
                <p className={`font-mono text-xs mt-2 leading-relaxed ${i < signalsDecoded ? 'text-zinc-500' : 'text-zinc-800'}`}>
                  {i < signalsDecoded 
                    ? "The fog shifts. We heard them calling from the deep sectors. They are not survivors. They are echoes."
                    : "0x0000 UNREADABLE... DECRYPTION KEY MISSING"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
