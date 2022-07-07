<script lang="ts">
  import { gameStore } from "$lib/store/store";
  import { GameState, getArray, getRandomNumber, NumberType, type GameStore } from "$lib/common";
  import Countdown from "$lib/components/Countdown.svelte";
  import NumberItem from "$lib/components/NumberItem.svelte";

  let numbersList: number[] = [0, 0, 0, 0, 0, 0];

  const generateNumbers = (): void => {
    gameStore.setItem("gameOn", true);
    numbersList = getArray(6).map(() => getRandomNumber(1, 10));
  };

  const generateRandomSum = (numList: number[]): void => {
    const list: number[] = [...numList];
    const numbersSumCount: number = getRandomNumber(2, 6);

    const targetSum: number = getArray(numbersSumCount).reduce((prev: number, current: number) => {
      const length: number = list.length;
      const index: number = getRandomNumber(0, length);
      const i: number[] = list.splice(index, 1);

      return prev + i[0];
    }, 0);

    gameStore.setItem("targetSum", targetSum);
  };

  const startGame = (): void => {
    gameStore.setItem("userSum", 0);
    generateNumbers();
    generateRandomSum(numbersList);
  };

  $: if ($gameStore.userSum > $gameStore.targetSum) {
    gameStore.setItem("gameState", GameState.LOSS);
  } else if ($gameStore.userSum === $gameStore.targetSum) {
    gameStore.setItem("gameState", GameState.WIN);
  } else {
    gameStore.setItem("gameState", GameState.NONE);
  }
  $: console.log("gameStore >>", $gameStore);
</script>

<section>
  <NumberItem num={$gameStore.targetSum !== 0 ? $gameStore.targetSum : "?"} type={NumberType.START} blocked />

  <div class="numbers">
    {#each numbersList as number}
      <NumberItem num={number !== 0 ? number : "?"} type={NumberType.MAIN} />
    {/each}
  </div>

  <div class="footer">
    {#if $gameStore.gameOn}
      <Countdown countdown={10} on:completed={() => gameStore.setItem("gameOn", false)} />
    {:else}
      <button on:click={startGame}>Start</button>
    {/if}
  </div>
</section>

<style lang="scss">
  section {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30vmax;

    .numbers {
      margin: 3rem 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      width: 21rem;
    }

    .footer {
      text-align: center;

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
