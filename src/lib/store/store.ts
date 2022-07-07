import { writable } from "svelte/store";
import { GameState, type GameStore } from "$lib/common";

const initialGameStore: GameStore = {
  gameOn: false,
  gameState: GameState.NONE,
  userSum: 0,
  targetSum: 0
};

const createStore = () => {
  const { update, subscribe } = writable<GameStore>(initialGameStore);

  return {
    subscribe,
    setItem: (name: string, value: boolean | number) =>
      update((currentGameStore: GameStore) => {
        return ({
          ...currentGameStore,
          [name]: value
        });
      })
  };
};

export const gameStore = createStore();