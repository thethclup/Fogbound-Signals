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
import { useGameStore } from './store/gameStore';

function GameRoot() {
  const screen = useGameStore(s => s.screen);

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden font-sans select-none">
      <div className="scanline"></div>
      
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
