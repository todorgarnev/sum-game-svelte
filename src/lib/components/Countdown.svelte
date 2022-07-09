<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameStateStore } from "$lib/store/store";
  import { GameState } from "$lib/common";
  export let countdown: number;

  let timer: any = null;

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  $: console.log("timer >>", timer);

  $: if ($gameStateStore?.gameOn && !timer) {
    timer = setInterval(() => {
      countdown -= 1;
    }, 1000);
  }

  $: if (
    (countdown === 0 && timer) ||
    (timer && !$gameStateStore?.gameOn && $gameStateStore?.gameStatus !== GameState.NONE)
  ) {
    clearInterval(timer);
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
