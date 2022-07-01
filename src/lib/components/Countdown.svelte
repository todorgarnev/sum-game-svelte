<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { onDestroy } from "svelte";
  export let countdown: number;

  const dispatch = createEventDispatcher();
  let timer: NodeJS.Timer | null = null;

  onMount(() => {
    timer = setInterval(() => {
      countdown -= 1;
    }, 1000);
  })

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  $: if (countdown === 0 && timer) {
    clearInterval(timer);
    dispatch("completed");
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
