import { create } from 'zustand';

export type GameScreen = 'title' | 'game' | 'outpost' | 'dead' | 'leaderboard';

export interface POI {
  id: string;
  x: number;
  y: number;
  type: 'outpost' | 'relic' | 'anomaly';
  discovered: boolean;
}

interface GameState {
  screen: GameScreen;
  battery: number;
  oxygen: number;
  sanity: number;
  x: number;
  y: number;
  score: number;
  pois: POI[];
  signalsDecoded: number;
  isPulsing: boolean;
  setScreen: (s: GameScreen) => void;
  updateStats: (delta: Partial<Pick<GameState, 'battery' | 'oxygen' | 'sanity' | 'x' | 'y' | 'score'>>) => void;
  setPulsing: (val: boolean) => void;
  discoverPOI: (id: string) => void;
  resetGame: () => void;
}

const INITIAL_STATS = {
  battery: 100,
  oxygen: 100,
  sanity: 100,
  x: 0,
  y: 0,
  score: 0,
  signalsDecoded: 0,
};

const INITIAL_POIS: POI[] = [
  { id: '1', x: 200, y: -300, type: 'outpost', discovered: false },
  { id: '2', x: -500, y: 150, type: 'relic', discovered: false },
  { id: '3', x: 800, y: 800, type: 'anomaly', discovered: false },
  { id: '4', x: -1000, y: -1000, type: 'relic', discovered: false },
];

export const useGameStore = create<GameState>((set) => ({
  screen: 'title',
  ...INITIAL_STATS,
  pois: INITIAL_POIS,
  isPulsing: false,
  setScreen: (screen) => set({ screen }),
  updateStats: (delta) => set((state) => ({ ...state, ...delta })),
  setPulsing: (val) => set({ isPulsing: val }),
  discoverPOI: (id) => set((state) => ({
    pois: state.pois.map(p => p.id === id ? { ...p, discovered: true } : p),
    signalsDecoded: state.pois.find(p => p.id === id && !p.discovered) ? state.signalsDecoded + 1 : state.signalsDecoded,
  })),
  resetGame: () => set({ ...INITIAL_STATS, pois: INITIAL_POIS, screen: 'game' }),
}));
