import type { GameState } from "./game-state.enum";

export interface GameStore {
  gameOn: boolean,
  gameState: GameState
  userSum: number;
  targetSum: number;
};