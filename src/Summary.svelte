<script>
  export let isSolved = false;
  export let attempts = 1;
</script>

<div class="container">
  <h2 class="text">Result</h2>
  <div class="text summary">
    {#if isSolved}
      <p>Congrats you solved the word puzzle!.</p>
    {:else}
      <p>Sorry, better luck next time.</p>
    {/if}
    <p>You used {attempts} out of 6 attempts.</p>
  </div>
</div>

<style>
  .container {
    width: 500px;
    height: 400px;
    border: 1px solid rgb(191, 191, 191);
    border-radius: 5px;
    position: absolute;
    background-color: white;
    opacity: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .text {
    color: black;
    text-align: center;
  }

  .summary {
    font-size: 28px;
  }
</style>
