<script lang="ts">
  import { NumberType } from "$lib/common";

  export let num: number | string;
  export let type: NumberType = NumberType.MAIN;
  export let blocked: boolean = false;

  const getNumberType = (type: NumberType): string => {
    switch (type) {
      case NumberType.START:
        return "#ffd700";
      case NumberType.SUCCESS:
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
</script>

<div class={`number ${blocked && "blocked"}`} style="--bg-color: {getNumberType(type)}">
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

    &.blocked {
      pointer-events: none;
    }
  }
</style>
