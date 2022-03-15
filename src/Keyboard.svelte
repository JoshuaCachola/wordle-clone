<script>
  import Key from './Key.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let keysState;
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'],
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
