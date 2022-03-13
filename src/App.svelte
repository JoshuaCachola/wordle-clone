<script>
  let word = 'again';

  function checkWord() {}
</script>

<main>
  <!-- <h1>Worduhl</h1> -->
  <div class="container">
    <div class="squares-container">
      <div class="square">
        <input type="text" />
      </div>
    </div>
    <button on:submit={checkWord}>Submit</button>
  </div>
</main>

<style>
  main {
    background-color: black;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  .squares-container {
    display: flex;
    justify-content: space-around;
    width: 600px;
  }

  .square {
    border-radius: 5px;
    width: 100px;
    height: 125px;
    background-color: blueviolet;
    display: flex;
    justify-content: center;
  }

  .letter {
    font-size: 64px;
  }
</style>
