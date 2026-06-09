import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';

const MOCK_LEADERBOARD = [
  { rank: 1, address: '0x84f...9a12', score: 14520, signals: 42 },
  { rank: 2, address: '0x21a...b3ef', score: 12100, signals: 38 },
  { rank: 3, address: '0x77c...09de', score: 9800, signals: 25 },
  { rank: 4, address: '0x55d...11aa', score: 8400, signals: 19 },
  { rank: 5, address: '0x99e...44cc', score: 7100, signals: 14 },
];

export const Leaderboard: React.FC = () => {
  const setScreen = useGameStore(s => s.setScreen);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <h2 className="text-4xl text-zinc-100 font-['Cinzel'] tracking-[0.3em] uppercase mb-2 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Bravest Nomads</h2>
        <p className="text-cyan-800 text-[10px] font-mono text-center mb-10 uppercase tracking-[0.4em]">Base Mainnet Hybrid Ledger</p>

        <div className="bg-[#050505] border border-zinc-800/80 rounded-sm overflow-hidden mb-8 shadow-2xl">
          <table className="w-full text-sm text-left text-zinc-400 font-mono">
            <thead className="text-[10px] text-zinc-600 uppercase bg-zinc-900/30 border-b border-zinc-900">
              <tr>
                <th className="px-4 py-3 tracking-widest">Rank</th>
                <th className="px-4 py-3 tracking-widest">Nomad</th>
                <th className="px-4 py-3 text-right tracking-widest">Range</th>
                <th className="px-4 py-3 text-right tracking-widest">Data</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((row) => (
                <tr key={row.rank} className="border-b border-zinc-900/50 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-4 py-4 text-xs text-zinc-500">{row.rank < 10 ? `0${row.rank}` : row.rank}</td>
                  <td className="px-4 py-4 text-xs text-cyan-600/80">{row.address}</td>
                  <td className="px-4 py-4 text-right text-xs text-zinc-300">{row.score}</td>
                  <td className="px-4 py-4 text-right text-xs text-amber-600/80">{row.signals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={() => setScreen('title')}
          className="w-full px-4 py-3 border-t border-zinc-800 text-zinc-500 hover:text-zinc-300 text-xs font-mono uppercase tracking-[0.2em] transition-colors"
        >
          Return to Hub
        </button>
      </motion.div>
    </div>
  );
};
