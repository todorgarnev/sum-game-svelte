<script lang="ts">
  import { onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { gameSumStore, gameStateStore, settingsStore } from "$lib/store";
  import { GameState } from "$lib/common";
  export let countdown: number;

  let timer: NodeJS.Timer | null = null;
  let timerColor: string;

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  $: if (countdown === 0) {
    gameSumStore.updateUserSum($gameSumStore.targetSum + 1);
  }

  $: if ($gameStateStore?.gameOn && !timer) {
    countdown = $settingsStore.timer;
    timer = setInterval(() => {
      countdown -= 1;
    }, 1000);
  }

  $: if (
    (countdown === 0 && timer) ||
    (timer && !$gameStateStore?.gameOn && $gameStateStore?.gameStatus !== GameState.NONE)
  ) {
    clearInterval(timer);
    timer = null;
  }

  $: timerColor = getTimerColor(countdown);

  const getTimerColor = (countdown: number): string => {
    const firstBreakNumber: number = $settingsStore.timer - Math.floor($settingsStore.timer / 3);
    const secondBreakNumber: number = $settingsStore.timer - 2 * Math.floor($settingsStore.timer / 3);

    if (countdown <= $settingsStore.timer && countdown >= firstBreakNumber) {
      return "#00b100";
    }

    if (countdown < firstBreakNumber && countdown >= secondBreakNumber) {
      return "#ffd700";
    }

    return "#e04343";
  };
</script>

<span class="timer" style="--bg-color: {timerColor}" in:fly={{ x: -500, duration: 300 }} out:fly={{ x: -500, duration: 300 }}>
  {countdown}
</span>

<style>
  .timer {
    font-size: 3rem;
    font-weight: bold;
    color: var(--bg-color);
  }
</style>
