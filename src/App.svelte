<script>
  let word = 'again'.split('');
  let guesses = new Array(5).fill().map(() => new Array(5).fill(''));
  // let guesses = [
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  // ];
  let attemptNumber = 0;
  let currentPosition = 0;

  function handleKeydown(e) {
    const currentAttempt = guesses[attemptNumber];

    if (e.keyCode === 8 && currentPosition >= 0) {
      if (currentAttempt[currentPosition] !== '') {
        currentAttempt[currentPosition] = '';
      } else {
        currentPosition--;
        currentAttempt[currentPosition] = '';
      }
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (currentPosition === 4 && currentAttempt[currentPosition] !== '') {
        return;
      }
      const letter = e.key;
      currentAttempt[currentPosition] = letter.toUpperCase();
      if (currentPosition < 4) currentPosition++;
    }

    guesses = guesses;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <!-- <h1>Worduhl</h1> -->
  <div class="container">
    {#each guesses as word}
      <div class="squares-container">
        {#each word as letter}
          <div class="square">
            <kbd class="letter">{letter}</kbd>
          </div>
        {/each}
      </div>
    {/each}
    <!-- <button on:submit={checkWord}>Submit</button> -->
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
    width: 75px;
    height: 75px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: grey;
    border-width: 5px;
    border-style: solid;
  }

  .letter {
    font-size: 36px;
    font-weight: 800;
    color: white;
  }
</style>
