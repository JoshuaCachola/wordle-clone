<script>
  import { onMount } from 'svelte';
  import Letter from './Letter.svelte';
  import Navbar from './Navbar.svelte';
  import Keyboard from './Keyboard.svelte';

  const word = 'again'.split('');
  const vacant = '';
  const GUESSES = 'GUESSES';
  const ATTEMPT = 'ATTEMPT';
  let attemptNumber =
    localStorage.getItem(ATTEMPT) !== null
      ? parseInt(localStorage.getItem(ATTEMPT))
      : 0;
  let currentPosition = 0;
  let guesses = new Array(6)
    .fill()
    .map(() => new Array(5).fill({ letter: vacant, state: 'in-progress' }));

  onMount(() => {
    if (localStorage.getItem(GUESSES) !== null) {
      guesses = createArrayFromJSON(JSON.parse(localStorage.getItem(GUESSES)));
    } else {
      localStorage.setItem(
        GUESSES,
        JSON.stringify(createJSONFromArray(guesses))
      );
      localStorage.setItem(ATTEMPT, 0);
    }
  });

  function createArrayFromJSON(json) {
    const guessArray = [];
    Object.values(json).forEach((attempt) => guessArray.push(attempt));
    return guessArray;
  }

  function createJSONFromArray(array) {
    const obj = {};
    array.forEach((attempt, idx) => {
      obj[idx] = attempt;
    });
    return obj;
  }

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
    localStorage.setItem(GUESSES, JSON.stringify(createJSONFromArray(guesses)));
    attemptNumber++;
    localStorage.setItem(ATTEMPT, attemptNumber);
    currentPosition = 0;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <Navbar />
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
  <Keyboard />
</main>

<style>
  main {
    background-color: black;
    height: 100vh;
  }

  .squares-container {
    display: flex;
    justify-content: space-around;
    width: 350px;
    margin: 10px 0;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }
</style>
