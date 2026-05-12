import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useSendTransaction, useAccount } from 'wagmi';
import { generateAttributionData, BASE_BUILDER_CODE } from '../lib/erc8021';
import { encodeAgentAuthorization } from '../lib/erc8004';

export const Outpost: React.FC = () => {
  const { updateStats, setScreen } = useGameStore();
  const { sendTransaction } = useSendTransaction();
  const { address } = useAccount();

  const handleSayGM = () => {
    if (!address) return alert("Connect wallet to Say GM on-chain!");
    const data = generateAttributionData(`0x676d`, BASE_BUILDER_CODE); // "gm" in hex roughly
    sendTransaction({ to: address, value: 0n, data });
  };

  const deployAgent = () => {
     if (!address) return alert("Connect wallet first");
     const authPayload = encodeAgentAuthorization({ owner: address, permissions: ['0x1234'], ttl: 3600 });
     console.log("ERC-8004 Agent Deployed", authPayload);
     alert("ERC-8004 Trustless Agent deployed for background exploration.");
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-green-900/50 p-8 rounded-lg max-w-md w-full text-center"
      >
        <h2 className="text-3xl text-green-400 tracking-widest uppercase mb-2">Sanctuary</h2>
        <p className="text-zinc-400 text-sm mb-8">You found an abandoned outpost. Systems are somewhat functional.</p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <button 
            onClick={() => updateStats({ battery: 100, oxygen: 100, sanity: 100 })}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded text-sm uppercase tracking-wider"
          >
            Recharge Stats
          </button>
          
          <button 
            onClick={deployAgent}
            className="p-3 border border-fuchsia-900 bg-fuchsia-950/30 hover:bg-fuchsia-900/50 text-fuchsia-400 rounded text-sm uppercase tracking-wider"
          >
            Deploy ERC-8004 Scout Agent
          </button>

          <button 
            onClick={handleSayGM}
            className="p-3 border border-indigo-900 bg-indigo-950/30 hover:bg-indigo-900/50 text-indigo-400 rounded text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Say "GM" On-Chain (Base)
          </button>
        </div>

        <button 
          onClick={() => setScreen('game')}
          className="w-full px-4 py-3 bg-zinc-100 text-zinc-900 text-sm font-bold uppercase rounded transition-colors hover:bg-white"
        >
          Return to the Fog
        </button>
      </motion.div>
    </div>
  );
};
