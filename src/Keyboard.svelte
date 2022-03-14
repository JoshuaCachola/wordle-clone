<script>
  import Key from './Key.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let keysState;
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete'],
  ];

  function forward(e) {
    dispatch('keyPress', e.detail);
  }
</script>

<div class="keyboard-container">
  {#each keys as row}
    <div class="row">
      {#each row as key}
        <Key
          {key}
          state={key.toLowerCase() in keysState
            ? keysState[key.toLowerCase()]
            : 'in-progress'}
          on:keyPress={forward}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
  }
</style>
