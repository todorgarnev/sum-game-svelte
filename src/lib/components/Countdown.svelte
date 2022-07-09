<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameSumStore, gameStateStore } from "$lib/store";
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
    countdown = 10;
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
    if (countdown <= 10 && countdown >= 7) {
      return "#00b100";
    }

    if (countdown < 7 && countdown >= 4) {
      return "#ffd700";
    }

    return "#e04343";
  };
</script>

<span class="timer" style="--bg-color: {timerColor}">
  {countdown}
</span>

<style>
  .timer {
    font-size: 3rem;
    font-weight: bold;
    color: var(--bg-color);
  }
</style>
