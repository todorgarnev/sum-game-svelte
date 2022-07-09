import { derived } from "svelte/store";
import { GameState } from "$lib/common";
import { gameSumStore } from "./sum.store";

const createStateStore = () => {
  const { subscribe } = derived(gameSumStore, $gameBaseStore => {
    if ($gameBaseStore.targetSum === 0) {
      return {
        gameOn: false,
        gameStatus: GameState.NONE
      };
    }

    if ($gameBaseStore.targetSum > 0 && $gameBaseStore.userSum < $gameBaseStore.targetSum) {
      return {
        gameOn: true,
        gameStatus: GameState.NONE
      };
    }

    if ($gameBaseStore.userSum > $gameBaseStore.targetSum) {
      return {
        gameOn: false,
        gameStatus: GameState.LOSS
      };
    } else if ($gameBaseStore.userSum === $gameBaseStore.targetSum) {
      return {
        gameOn: false,
        gameStatus: GameState.WIN
      };
    }
  });

  return {
    subscribe,
  };
};

export const gameStateStore = createStateStore();