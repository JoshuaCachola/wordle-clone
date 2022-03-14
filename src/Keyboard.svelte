<script>
  import Key from './Key.svelte';
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete'],
  ];
</script>

<div class="keyboard-container">
  {#each keys as row}
    <div class="row">
      {#each row as key}
        <Key {key} state="in-progress" />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
  }
</style>
