import { writable } from "svelte/store";
import type { SettingsStore } from "$lib/common";

const initialSettingsStore: SettingsStore = {
  timer: 10,
  items: 6
};

const createSettingsStore = () => {
  const { update, subscribe } = writable<SettingsStore>(initialSettingsStore);

  return {
    subscribe,
    updateTimer: (value: number) =>
      update((currentSettingsStore: SettingsStore) => {
        return ({
          ...currentSettingsStore,
          timer: value
        });
      }),
    updateItems: (value: number) =>
      update((currentSettingsStore: SettingsStore) => {
        return ({
          ...currentSettingsStore,
          items: value
        });
      }),
  };
};

export const settingsStore = createSettingsStore();