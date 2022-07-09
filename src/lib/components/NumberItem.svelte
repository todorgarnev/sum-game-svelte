<script lang="ts">
  import { gameSumStore, selectedNumbersStore } from "$lib/store/store";
  import { NumberType } from "$lib/common";

  export let id: number;
  export let num: number | string;
  export let type: NumberType = NumberType.MAIN;
  export let blocked: boolean = false;

  const getNumberType = (type: NumberType): string => {
    switch (type) {
      case NumberType.START:
        return "#ffd700";
      case NumberType.SUCCESS:
        return "#00b100";
      case NumberType.FAIL:
        return "#e04343";
      case NumberType.SELECTED:
        return "#ccc";
      case NumberType.MAIN:
      default:
        return "#00aacc";
    }
  };

  const onItemClick = (): void => {
    selectedNumbersStore.addNumber(id);
    gameSumStore.updateUserSum($gameSumStore.userSum + Number(num));
  };
</script>

<div
  class={`number ${blocked ? "blocked" : ""} ${$selectedNumbersStore.includes(id) ? "clicked" : ""}`}
  style="--bg-color: {getNumberType(type)}"
  on:click={onItemClick}
>
  {num}
</div>

<style lang="scss">
  .number {
    padding: 1.5rem 1rem;
    width: 10rem;
    background-color: var(--bg-color);
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.clicked {
      background-color: #ccc;
      color: #ababac;
    }

    &.blocked {
      pointer-events: none;
    }
  }
</style>
