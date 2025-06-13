<!-- Javascript -->
<script module>
  let counter = 0
</script>
<script>
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();

  // Event Dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  
  /**
   * @typedef {Object} Props
   * @property {string} [label] - Exports
   * @property {number} [value]
   * @property {number} [max]
   * @property {number} [min]
   * @property {string} [units]
   * @property {boolean} [disabled]
   */

  /** @type {Props} */
  let {
    label = "",
    value = $bindable(50),
    max = 100,
    min = 0,
    units = "%",
    disabled = false
  } = $props();

  // Variables
  let id = "slider_" + counter++;

  // Dynamic Variables
  let percent = $derived(((value - min) / (max - min)) * 100);
  let background = $derived(`linear-gradient(to right, var(--color-bg-primary) 0% ${percent}%, var(--color-bg-secondary) ${percent}% 100%)`)

</script>

<!-- HTML -->
<div>
  <label 
    for={id}
    hidden={label === ""}>
    {label}
    <output>
      {value} {units}
    </output>
  </label>
  <input
    type="range" 
    id={id}
    max={max}
    min={min}
    disabled={disabled}
    style="background: {background}"
    bind:value={value}
    oninput={bubble('input')}
  >
</div>

<!-- CSS -->
<style>
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    min-width: 150px;
    height: var(--gap);
    margin: calc(var(--gap)*1.25) 0 var(--pad) 0;
    padding: 0;
    border: none;
    border-radius: var(--radius);
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: calc(var(--gap)*2);
    width: calc(var(--gap)*1.5);
    border: var(--border);
    border-color: var(--color-text);
    border-radius: var(--radius);
    background-color: var(--color-text);
  }
  input[type=range]::-moz-range-thumb {
    height: calc(var(--gap)*2);
    width: calc(var(--gap)*1.5);
    border: var(--border);
    border-color: var(--color-text);
    border-radius: var(--radius);
    background-color: var(--color-text);
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]:disabled {
    filter: var(--filter-brightness-diable);
    cursor: not-allowed;
  }
  label {
    display: flex;
    /* border: 1px solid red; */
  }
  output {
    margin-left: auto;
  }
</style>