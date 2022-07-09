<script lang="ts">
  import { fly } from "svelte/transition";
  import { gameSumStore, gameStateStore, selectedNumbersStore, settingsStore } from "$lib/store";
  import Countdown from "$lib/components/Countdown.svelte";
  import NumberItem from "$lib/components/NumberItem.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import { GameState, getArray, getNumberItemType, getRandomNumber, NumberType } from "$lib/common";

  let numbersList: number[] = new Array($settingsStore.items).fill(0);

  $: numbersList = new Array($settingsStore.items).fill(0);

  const generateNumbers = (): void => {
    numbersList = getArray($settingsStore.items).map(() => getRandomNumber(1, 10));
  };

  const generateRandomSum = (numList: number[]): void => {
    const list: number[] = [...numList];
    const numbersSumCount: number = getRandomNumber($settingsStore.items / 3, $settingsStore.items);

    const targetSum: number = getArray(numbersSumCount).reduce((prev: number) => {
      const length: number = list.length;
      const index: number = getRandomNumber(0, length);
      const i: number[] = list.splice(index, 1);

      return prev + i[0];
    }, 0);

    gameSumStore.updateTargetSum(targetSum);
  };

  const startGame = (): void => {
    selectedNumbersStore.clearStore();
    gameSumStore.updateUserSum(0);
    generateNumbers();
    generateRandomSum(numbersList);
  };
</script>

<section class="game" style="--width: {$settingsStore.items === 12 ? "32vmax" : "25vmax"}">
  <NumberItem
    id={999}
    num={$gameSumStore.targetSum !== 0 ? $gameSumStore.targetSum : "?"}
    type={getNumberItemType($gameStateStore?.gameStatus || GameState.NONE)}
    blocked
  />

  <div class="numbers">
    {#each numbersList as number, i}
      <NumberItem id={i} num={number !== 0 ? number : "?"} type={NumberType.MAIN} blocked={!$gameStateStore?.gameOn} />
    {/each}
  </div>

  <div class="footer">
    {#if $settingsStore.timer > 0}
      <Countdown countdown={$settingsStore.timer} />
    {/if}

    {#if !$gameStateStore?.gameOn}
      <button on:click={startGame} in:fly={{ x: 500, duration: 300 }} out:fly={{ x: 500, duration: 300 }}>
        {#if $gameStateStore?.gameStatus === GameState.NONE}
          Start
        {:else}
          Try again
        {/if}
      </button>
    {/if}
  </div>
</section>

{#if !$gameStateStore?.gameOn}
  <Settings />
{/if}

<style lang="scss">
  .game {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 34rem;

    .numbers {
      margin: 3rem 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    .footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      button {
        padding: 1rem 2rem;
        border: none;
        background-color: #00b100;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
