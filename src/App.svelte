<script>
  import { onMount } from 'svelte';
  import Letter from './Letter.svelte';
  import Navbar from './Navbar.svelte';
  import Keyboard from './Keyboard.svelte';
  import Summary from './Summary.svelte';

  let word = updateWord();
  const vacant = '';
  const GUESSES = 'GUESSES';
  const ATTEMPT = 'ATTEMPT';
  const KEYS = 'KEYS';
  let attemptNumber =
    localStorage.getItem(ATTEMPT) !== null
      ? parseInt(localStorage.getItem(ATTEMPT))
      : 0;

  let currentPosition = 0;
  let guesses = new Array(6)
    .fill()
    .map(() => new Array(5).fill({ letter: vacant, state: 'in-progress' }));
  let keysState =
    localStorage.getItem(KEYS) !== null
      ? JSON.parse(localStorage.getItem(KEYS))
      : {};

  $: currentAttempt = guesses[attemptNumber];
  $: isFinished = attemptNumber === 6 || doesPreviousAttemptMatchWord();

  onMount(async () => {
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

  function doesPreviousAttemptMatchWord() {
    if (attemptNumber === 0) return false;
    const guess = guesses[attemptNumber - 1];
    for (let i = 0; i < guess.length; i++) {
      if (word[i] !== guess[i].letter) return false;
    }

    return true;
  }

  async function updateWord() {
    const res = await fetch('http://localhost:4321/');
    const data = await res.json();
    word = data.word;
  }

  function updateKeys() {
    currentAttempt.forEach(({ letter, state }) => (keysState[letter] = state));
  }

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

  function vacantLetter() {
    if (currentPosition >= 0) {
      currentAttempt[currentPosition] = {
        ...currentAttempt[currentPosition],
        letter: vacant,
      };
    }

    guesses = guesses;
  }

  function addLetter(letter) {
    if (
      currentPosition === 4 &&
      currentAttempt[currentPosition].letter !== vacant
    ) {
      return;
    }
    currentAttempt[currentPosition] = {
      ...currentAttempt[currentPosition],
      letter,
    };

    if (currentPosition < 4) currentPosition++;
    guesses = guesses;
  }

  function handleKeydown(e) {
    if (isFinished) return;
    if (e.keyCode === 8) {
      if (
        currentAttempt[currentPosition].letter === vacant &&
        currentPosition > 0
      ) {
        currentPosition--;
      }
      vacantLetter();
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      addLetter(e.key);
    } else if (e.keyCode === 13) {
      checkWord();
    }
  }

  // const animateSquare = () => {
  //   return {
  //     css: (t) => {
  //       return `
  // 				transform:
  // 			`;
  //     },
  //     duration: 1000,
  //   };
  // };

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
    // animateSquare();
    updateKeys(keysState);
    attemptNumber++;
    currentPosition = 0;
    localStorage.setItem(KEYS, JSON.stringify(keysState));
    localStorage.setItem(GUESSES, JSON.stringify(createJSONFromArray(guesses)));
    localStorage.setItem(ATTEMPT, attemptNumber);
  }

  function handleKeyPress(e) {
    if (key === undefined || isFinished) return;

    const key = e.detail.key;

    if (key === 'Delete') {
      if (
        currentAttempt[currentPosition].letter === vacant &&
        currentPosition > 0
      ) {
        currentPosition--;
      }
      vacantLetter();
    } else if (key === 'Enter') {
      checkWord();
    } else {
      addLetter(key.toLowerCase());
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <Navbar />
  <div class="container">
    {#if isFinished}
      <Summary />
    {/if}
    {#each guesses as word}
      <div class="squares-container">
        {#each word as letterObj}
          <Letter letter={letterObj.letter} state={letterObj.state} />
        {/each}
      </div>
    {/each}
    <button on:click={checkWord}>Submit</button>
  </div>
  <Keyboard on:keyPress={handleKeyPress} {keysState} />
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
