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
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: grey;
    border-width: 3px;
    border-style: solid;
  }

  .in-progress {
    background-color: black;
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

  .letter {
    font-size: 28px;
    font-weight: 800;
    color: white;
  }
</style>
