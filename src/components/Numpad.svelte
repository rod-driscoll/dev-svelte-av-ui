<!-- Javascript -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<!-- HTML -->
<div class="grid3x3">

  <button onclick={() => {dispatch('press', '1')}}>1</button>
  <button onclick={() => {dispatch('press', '2')}}>2</button>
  <button onclick={() => {dispatch('press', '3')}}>3</button>

  <button onclick={() => {dispatch('press', '4')}}>4</button>
  <button onclick={() => {dispatch('press', '5')}}>5</button>
  <button onclick={() => {dispatch('press', '6')}}>6</button>

  <button onclick={() => {dispatch('press', '7')}}>7</button>
  <button onclick={() => {dispatch('press', '8')}}>8</button>
  <button onclick={() => {dispatch('press', '9')}}>9</button>

  <button onclick={() => {dispatch('press', '*')}}>*</button>
  <button onclick={() => {dispatch('press', '0')}}>0</button>
  <button onclick={() => {dispatch('press', '#')}}>#</button>

</div>

<!-- CSS -->
<style>
  .grid3x3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
    /* border: var(--border); border-color: red; */
  }
  button {
    --size: 5rem;
    height: var(--size);
    width: var(--size);
    font-size: 2rem;
    padding: 0;
    position: relative;
    background-color: var(--color-bg-secondary);
    /* border: var(--border); border-color: red; */
  }
</style>