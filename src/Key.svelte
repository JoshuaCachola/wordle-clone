<script>
  export let key;
  export let state;
</script>

<div class="container {state}">
  <span class="key">{key}</span>
</div>

<style>
  .container {
    width: 50px;
    height: 55px;
    border-radius: 2px;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    cursor: pointer;
  }

  .key {
    color: white;
    font-weight: 600;
  }
</style>
