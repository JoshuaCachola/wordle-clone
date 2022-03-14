<script>
  import { createEventDispatcher } from 'svelte';

  export let key;
  export let state;

  const dispatch = createEventDispatcher();

  function handleKeyPress(e) {
    dispatch('keyPress', { key: e.originalTarget.firstChild.data });
  }
</script>

<div class="container {state}" on:click={handleKeyPress}>
  {key}
</div>

<style>
  .container {
    width: 50px;
    height: 55px;
    border-radius: 2px;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    cursor: pointer;
    color: white;
    font-weight: 600;
  }

  .in-progress {
    background-color: grey;
  }

  .hit {
    background-color: rgb(81, 157, 109);
  }

  .miss {
    background-color: rgb(52, 47, 47);
  }

  .in-word {
    background-color: rgb(212, 223, 85);
  }
</style>
