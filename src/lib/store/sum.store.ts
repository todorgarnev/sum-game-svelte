import { writable } from "svelte/store";
import type { GameStore } from "$lib/common";

const initialGameSumStore: GameStore = {
  userSum: 0,
  targetSum: 0
};

const createSumStore = () => {
  const { update, subscribe } = writable<GameStore>(initialGameSumStore);

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

export const gameSumStore = createSumStore();