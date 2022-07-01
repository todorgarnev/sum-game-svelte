<script lang="ts">
  import { getRandomNumber, NumberType } from "$lib/common";
  import NumberItem from "$lib/components/NumberItem.svelte";

  export let numbersList: number[] = [0, 0, 0, 0, 0, 0];
  export let sum: number = 0;
  export const generateNumbers = (): void => {
    numbersList = [...Array(6).keys()].map(() => getRandomNumber(1, 10));
  };

  const generateRandomSum = (numList: number[]): number => {
    const list: number[] = [...numList];
    const numbersSumCount: number = getRandomNumber(2, 6);

    // TODO: Add custom function for this
    return [...Array(numbersSumCount).keys()].reduce((prev: number, current: number) => {
      const length: number = list.length;
      const index: number = getRandomNumber(0, length);
      const i: number[] = list.splice(index, 1);

      return prev + i[0];
    }, 0);
  };

  $: sum = numbersList.length > 0 ? generateRandomSum(numbersList) : 0;
</script>

<section>
  <NumberItem num={sum !== 0 ? sum : "?"} type={NumberType.START} blocked />

  <div class="numbers">
    {#each numbersList as number}
      <NumberItem num={number !== 0 ? number : "?"} type={NumberType.MAIN} />
    {/each}
  </div>

  <div class="footer">
    <div class="timer">10</div>
    <button on:click={generateNumbers}>Start</button>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .timer {
        font-size: 3rem;
        font-weight: bold;
      }

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
