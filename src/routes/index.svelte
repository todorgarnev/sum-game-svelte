<script lang="ts">
  import { getRandomNumber } from "$lib/common/getRandomNumber.util";
  import { NumberType } from "$lib/common/number.enum";
  import NumberItem from "$lib/components/NumberItem.svelte";

  export const gameNumbers: number[] = [...Array(6).keys()].map(() => getRandomNumber(1, 9));

  // get random sum and display it
</script>

<section>
  <NumberItem num="?" type={NumberType.START} blocked />

  <div class="numbers">
    {#each gameNumbers as number}
      <NumberItem num={number} type={NumberType.MAIN} />
    {/each}
  </div>

  <NumberItem num="Start" type={NumberType.SUCCESS} />
</section>

<style lang="scss">
  section {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
  }

  .numbers {
    margin: 3rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 21rem;
  }
</style>
