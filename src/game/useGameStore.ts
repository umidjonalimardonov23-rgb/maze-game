import { create } from 'zustand';

export type GamePhase = 'menu' | 'playing' | 'dead' | 'won';

interface GameState {
  phase: GamePhase;
  score: number;
  lives: number;
  collectedItems: Set<number>;
  totalItems: number;
  playerPos: { x: number; z: number };
  flashMessage: string;

  startGame: () => void;
  collectItem: (id: number, points: number, label: string) => void;
  hitObstacle: () => void;
  setPlayerPos: (x: number, z: number) => void;
  setFlashMessage: (msg: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'menu',
  score: 0,
  lives: 3,
  collectedItems: new Set(),
  totalItems: 27,
  playerPos: { x: 0, z: 0 },
  flashMessage: '',

  startGame: () => set({
    phase: 'playing',
    score: 0,
    lives: 3,
    collectedItems: new Set(),
    flashMessage: '',
  }),

  collectItem: (id, points, label) => {
    const { collectedItems, score, totalItems } = get();
    if (collectedItems.has(id)) return;
    const next = new Set(collectedItems);
    next.add(id);
    const newScore = score + points;
    const won = next.size >= totalItems;
    set({
      collectedItems: next,
      score: newScore,
      flashMessage: `+${points} ${label}!`,
      phase: won ? 'won' : 'playing',
    });
    setTimeout(() => set({ flashMessage: '' }), 1200);
  },

  hitObstacle: () => {
    const { lives } = get();
    const newLives = lives - 1;
    if (newLives <= 0) {
      set({ lives: 0, phase: 'dead', flashMessage: 'OUCH!' });
    } else {
      set({ lives: newLives, flashMessage: 'OUCH! Watch out!' });
      setTimeout(() => set({ flashMessage: '' }), 1200);
    }
  },

  setPlayerPos: (x, z) => set({ playerPos: { x, z } }),
  setFlashMessage: (msg) => set({ flashMessage: msg }),
}));
