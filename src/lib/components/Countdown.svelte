<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameSumStore, gameStateStore } from "$lib/store/store";
  import { GameState } from "$lib/common";
  export let countdown: number;

  let timer: NodeJS.Timer | null = null;

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
</script>

<span class="timer">
  {countdown}
</span>

<style>
  .timer {
    font-size: 3rem;
    font-weight: bold;
  }
</style>
