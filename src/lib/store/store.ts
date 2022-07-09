import { writable, derived } from "svelte/store";
import { GameState, type GameStore } from "$lib/common";

const initialGameBaseStore: GameStore = {
  userSum: 0,
  targetSum: 0
};

const createBaseStore = () => {
  const { update, subscribe } = writable<GameStore>(initialGameBaseStore);

  return {
    subscribe,
    updateTargetSum: (value: number) =>
      update((currentGameStore: GameStore) => {
        return ({
          ...currentGameStore,
          targetSum: value
        });
      }),
    updateUserSum: (value: number) =>
      update((currentGameStore: GameStore) => {
        return ({
          ...currentGameStore,
          userSum: value
        });
      }),
  };
};

const createDerivedStore = () => {
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

export const gameSumStore = createBaseStore();
export const gameStateStore = createDerivedStore();