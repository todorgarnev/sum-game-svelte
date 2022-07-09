<script lang="ts">
  import { fly } from "svelte/transition";
  import { settingsStore } from "$lib/store";

  const onChangeTimerHandler = (event: Event): void => {
    settingsStore.updateTimer(Number((event.target as HTMLInputElement).value));
  }
  const onChangeItemsHandler = (event: Event): void => {
    settingsStore.updateItems(Number((event.target as HTMLInputElement).value));
  }

  $: console.log("settingsStore >>", $settingsStore);
</script>

<section in:fly={{ x: -500, duration: 300 }} out:fly={{ x: -500, duration: 300 }}>
  <div class="options-group">
    <p class="title">Timer</p>

    <div class="option">
      <input
        type="radio"
        id="5"
        name="timer"
        value="5"
        on:change={onChangeTimerHandler}
        checked={$settingsStore.timer === 5}
      />
      <label for="5">5s</label>
    </div>

    <div class="option">
      <input
        type="radio"
        id="10"
        name="timer"
        value="10"
        on:change={onChangeTimerHandler}
        checked={$settingsStore.timer === 10}
      />
      <label for="10">10s</label>
    </div>

    <div class="option">
      <input
        type="radio"
        id="15"
        name="timer"
        value="15"
        on:change={onChangeTimerHandler}
        checked={$settingsStore.timer === 15}
      />
      <label for="15">15s</label>
    </div>

    <div class="option">
      <input
        type="radio"
        id="0"
        name="timer"
        value="0"
        on:change={onChangeTimerHandler}
        checked={$settingsStore.timer === 0}
      />
      <label for="0">No timer</label>
    </div>
  </div>

  <div class="options-group">
    <p class="title">Items</p>

    <div class="option">
      <input
        type="radio"
        id="6"
        name="items"
        value="6"
        on:change={onChangeItemsHandler}
        checked={$settingsStore.items === 6}
      />
      <label for="6">6</label>
    </div>

    <div class="option">
      <input
        type="radio"
        id="9"
        name="items"
        value="9"
        on:change={onChangeItemsHandler}
        checked={$settingsStore.items === 9}
      />
      <label for="9">9</label>
    </div>

    <div class="option">
      <input
        type="radio"
        id="12"
        name="items"
        value="12"
        on:change={onChangeItemsHandler}
        checked={$settingsStore.items === 12}
      />
      <label for="12">12</label>
    </div>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 5rem;
    display: flex;
    justify-content: center;

    .options-group {
      font-size: 1.5rem;

      &:not(:last-child) {
        margin-right: 5rem;
      }

      .title {
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        font-weight: bold;
      }

      .option {
        display: flex;
        align-items: center;

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }

        input {
          margin: 0;
        }

        label {
          margin-left: 1rem;
        }

        input,
        label {
          cursor: pointer;
        }
      }
    }
  }
</style>
