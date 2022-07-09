import { writable } from "svelte/store";

const createSelectedNumbersStore = () => {
  const { update, subscribe } = writable<number[]>([]);

  return {
    subscribe,
    addNumber: (value: number) =>
      update((currentSelectedNumbersStore: number[]) => {
        return [...currentSelectedNumbersStore, value];
      }),
    clearStore: () =>
      update(() => {
        return [];
      }),
  };
};

export const selectedNumbersStore = createSelectedNumbersStore();