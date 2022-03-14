<script>
  export let letter;
  export let state;
</script>

<div class="square {state}">
  <kbd class="letter">
    {letter.toUpperCase()}
  </kbd>
</div>

<style>
  .square {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: grey;
    border-width: 5px;
    border-style: solid;
  }

  .in-progress {
    background-color: black;
  }

  .hit {
    background-color: green;
  }

  .miss {
    background-color: red;
  }

  .in-word {
    background-color: yellow;
  }

  .letter {
    font-size: 36px;
    font-weight: 800;
    color: white;
  }
</style>
