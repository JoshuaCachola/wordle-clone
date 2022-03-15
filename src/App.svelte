<script>
  import { onMount } from 'svelte';
  import Letter from './Letter.svelte';
  import Navbar from './Navbar.svelte';
  import Keyboard from './Keyboard.svelte';
  import Summary from './Summary.svelte';

  // Constants
  const VACANT = '';
  const GUESSES = 'GUESSES';
  const ATTEMPT = 'ATTEMPT';
  const KEYS = 'KEYS';
  const ANSWER = 'ANSWER';

  // Initial state of variables
  let word = '';
  let attemptNumber = 0;
  let currentPosition = 0;
  let guesses = new Array(6)
    .fill()
    .map(() => new Array(5).fill({ letter: VACANT, state: 'in-progress' }));
  let keysState = {};

  // Reactive variables
  $: currentAttempt = guesses[attemptNumber];
  $: isFinished = attemptNumber === 6 || doesPreviousAttemptMatchWord();

  // When component mounts check if there is a word in local storage
  // check if word matches the word from the server
  // if it does then pull state from local storage
  // else reset local storage
  onMount(async () => {
    const currentWord = await getWord();
    if (
      localStorage.getItem(ANSWER) === null ||
      localStorage.getItem(ANSWER) !== currentWord
    ) {
      localStorage.setItem(
        GUESSES,
        JSON.stringify(createJSONFromArray(guesses))
      );
      localStorage.setItem(ATTEMPT, 0);
      localStorage.setItem(ANSWER, currentWord);
      localStorage.setItem(KEYS, JSON.stringify(keysState));
    } else {
      guesses = createArrayFromJSON(JSON.parse(localStorage.getItem(GUESSES)));
      keysState = JSON.parse(localStorage.getItem(KEYS));
      attemptNumber = localStorage.getItem(ATTEMPT);
    }
    word = currentWord;
  });

  // loop to compare the previous attempt matches word
  function doesPreviousAttemptMatchWord() {
    if (attemptNumber === 0) return false;
    const guess = guesses[attemptNumber - 1];
    for (let i = 0; i < guess.length; i++) {
      if (word[i] !== guess[i].letter) return false;
    }

    return true;
  }

  // gets word from server
  async function getWord() {
    const res = await fetch('http://localhost:4321/');
    const data = await res.json();
    return data.word;
  }

  // updates the state of the keys in Keyboard component
  function updateKeys() {
    currentAttempt.forEach(({ letter, state }) => (keysState[letter] = state));
  }

  // creates nested array from json
  function createArrayFromJSON(json) {
    const guessArray = [];
    Object.values(json).forEach((attempt) => guessArray.push(attempt));
    return guessArray;
  }

  // creates json with index as keys for the nested array
  function createJSONFromArray(array) {
    const obj = {};
    array.forEach((attempt, idx) => {
      obj[idx] = attempt;
    });
    return obj;
  }

  // removes a letter when clicking the on screen delete button
  // or pressing delete on keyboard
  function vacantLetter() {
    if (currentPosition >= 0) {
      currentAttempt[currentPosition] = {
        ...currentAttempt[currentPosition],
        letter: VACANT,
      };
    }

    guesses = guesses;
  }

  // adds a letter if current position is < 5
  // increases position if current position < 4
  function addLetter(letter) {
    if (
      currentPosition === 4 &&
      currentAttempt[currentPosition].letter !== VACANT
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

  // handler for key presses on keyboard
  function handleKeydown(e) {
    if (isFinished) return;
    if (e.keyCode === 8) {
      if (
        currentAttempt[currentPosition].letter === VACANT &&
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

  // updates keysState object with different states
  // 	'hit' - correct letter and correct spot
  //	'in-word' - correct letter, wrong spot
  //	'miss' - letter not in word
  //  'in-progress' - default state
  function checkWord() {
    // checks for incomplete attempt
    if (guesses[attemptNumber][word.length - 1].letter === VACANT) return;

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
    updateKeys(keysState);
    attemptNumber++;
    currentPosition = 0;
    localStorage.setItem(KEYS, JSON.stringify(keysState));
    localStorage.setItem(GUESSES, JSON.stringify(createJSONFromArray(guesses)));
    localStorage.setItem(ATTEMPT, attemptNumber);
  }

  // handler for on screen keyboard clicks
  function handleKeyPress(e) {
    if (key === undefined || isFinished) return;

    const key = e.detail.key;

    if (key === 'Delete') {
      if (
        currentAttempt[currentPosition].letter === VACANT &&
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
      <Summary
        isSolved={doesPreviousAttemptMatchWord()}
        attempts={attemptNumber}
      />
    {/if}
    {#each guesses as word}
      <div class="squares-container">
        {#each word as letterObj}
          <Letter letter={letterObj.letter} state={letterObj.state} />
        {/each}
      </div>
    {/each}
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
    margin: 2rem 0;
  }
</style>
