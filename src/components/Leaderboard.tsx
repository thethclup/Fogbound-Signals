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
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl text-zinc-100 tracking-widest uppercase mb-2 text-center">Bravest Hunters</h2>
        <p className="text-zinc-500 text-xs text-center mb-8 uppercase tracking-widest">Base Mainnet Hybrid Ledger</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-8">
          <table className="w-full text-sm text-left text-zinc-400">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Hunter</th>
                <th className="px-4 py-3 text-right">Score</th>
                <th className="px-4 py-3 text-right">Signals</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((row) => (
                <tr key={row.rank} className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-3 font-mono">{row.rank}</td>
                  <td className="px-4 py-3 font-mono text-cyan-400">{row.address}</td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300">{row.score}</td>
                  <td className="px-4 py-3 text-right font-mono text-fuchsia-400">{row.signals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={() => setScreen('title')}
          className="w-full px-4 py-3 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-sm font-bold uppercase rounded transition-colors"
        >
          Back to Title
        </button>
      </motion.div>
    </div>
  );
};
