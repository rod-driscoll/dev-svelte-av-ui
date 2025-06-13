<!-- Javascript -->
<script>

  // Event Dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Imports
  import Icon from "./Icon.svelte";

  
  /**
   * @typedef {Object} Props
   * @property {string} [icon] - Export
   * @property {boolean} [muted]
   */

  /** @type {Props} */
  let { icon = "mic_off", muted = false } = $props();

</script>

<!-- HTML -->
<button 
  class:muted={muted}
  onclick={() => dispatch('mute', muted)}
>
  <Icon name={icon}/>
</button>

<!-- CSS -->
<style>
  button {
    font-size: 1.6rem;
    color: var(--color-text-dim);
    border: var(--border);
    border-color: var(--color-bg-secondary);
    width: 4rem;
    height: 4rem;
    padding: 0;
    border-radius: 99px;
  }
  .muted {
    border: var(--border);
    border-color: var(--color-bg-red);
    background-color: var(--color-bg-red);
    color: var(--color-text-red);
  }
</style>