<script>
  import Letter from './Letter.svelte';

  const word = 'again'.split('');
  const vacant = '';
  let guesses = new Array(5)
    .fill()
    .map(() => new Array(5).fill({ letter: vacant, state: 'in-progress' }));
  let attemptNumber = 0;
  let currentPosition = 0;

  function handleKeydown(e) {
    const currentAttempt = guesses[attemptNumber];
    if (e.keyCode === 8 && currentPosition > 0) {
      if (currentAttempt[currentPosition].letter === vacant) {
        currentPosition--;
      }
      currentAttempt[currentPosition] = {
        ...currentAttempt[currentPosition],
        letter: vacant,
      };
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (
        currentPosition === 4 &&
        currentAttempt[currentPosition].letter !== vacant
      ) {
        return;
      }
      currentAttempt[currentPosition] = {
        ...currentAttempt[currentPosition],
        letter: e.key,
      };
      if (currentPosition < 4) currentPosition++;
    }
    console.log(guesses);
    guesses = guesses;
  }

  function checkWord() {
    // checks for incomplete attempt
    if (guesses[attemptNumber][word.length - 1].letter === vacant) return;

    const wordSet = new Set(word);
    const guessResult = guesses[attemptNumber];
    guessResult.map((letterObj, idx) => {
      if (word[idx] === letterObj.letter) {
        letterObj.state = 'hit';
      } else if (wordSet.has(letterObj.letter)) {
        letterObj.state = 'in-word';
      } else {
        letterObj.state = 'miss';
      }
    });

    guesses[attemptNumber] = [...guessResult];
    attemptNumber++;
    currentPosition = 0;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <div class="container">
    {#each guesses as word}
      <div class="squares-container">
        {#each word as letterObj}
          <Letter letter={letterObj.letter} state={letterObj.state} />
        {/each}
      </div>
    {/each}
    <button on:click={checkWord}>Submit</button>
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
    width: 400px;
    margin: 10px 0;
  }
</style>
