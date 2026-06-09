/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Web3Wrapper } from './components/Web3Provider';
import { MainMenu } from './components/MainMenu';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { DeadScreen } from './components/DeadScreen';
import { Outpost } from './components/Outpost';
import { Leaderboard } from './components/Leaderboard';
import { Archives } from './components/Archives';
import { useGameStore } from './store/gameStore';
import { GMButton } from './components/GMButton';
import { WalletConnect } from './components/Web3Provider';

function GameRoot() {
  const screen = useGameStore(s => s.screen);

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden font-sans select-none text-zinc-200">
      <div className="scanline"></div>
      
      {/* Top right corner utilities */}
      <div className="absolute top-4 right-4 z-50 flex flex-col md:flex-row items-end md:items-center gap-3">
        <GMButton />
        <WalletConnect />
      </div>

      {screen === 'title' && <MainMenu />}
      
      {(screen === 'game' || screen === 'outpost' || screen === 'dead') && (
        <>
          <GameCanvas />
          {screen === 'game' && <HUD />}
        </>
      )}

      {screen === 'outpost' && <Outpost />}
      {screen === 'dead' && <DeadScreen />}
      {screen === 'leaderboard' && <Leaderboard />}
      {screen === 'archives' && <Archives />}
    </div>
  );
}

export default function App() {
  return (
    <Web3Wrapper>
      <GameRoot />
    </Web3Wrapper>
  );
}
