<!-- Javascript -->
<script>

  // Stores
  import { global } from '../js/global.js';

  

  // Components
  import Icon from '../components/Icon.svelte'
  import Numpad from '../components/Numpad.svelte'
  /**
   * @typedef {Object} Props
   * @property {any} [config] - Configuration
   */

  /** @type {Props} */
  let { config = {
    "name": "Phone",
    "placeholder": "405-123-4567"
  } } = $props();

  // Functions
  function printNumber(num) {
    let string =''
    for (let i = 0; i < num.length; i++) {
      const digit = num[i]
      if (i === 3 && num.length >= 7) string += "-"
      if (i === 6 && num.length > 7) string += "-"
      string += digit
    }
    return string
  }

  // Variables
  let timeout = $state()
  let clearTimeout_sec = 1
  let inCall = $state(false)
  let number = $state("")
  let dtmf = $state("")
  let placeholder = config.placeholder || "123-456-6789"
  let numberString = $derived(printNumber(number))

</script>

<!-- HTML -->
<section>
  <div>
    <div class="number">
      {#if inCall}
        <div style="margin-right: auto;">
          <h2 class="smallNum">{numberString}</h2>
          <h2 class="dtmf"><pre>{dtmf} </pre></h2>
        </div>
        <button class="back hide"><Icon name="arrow_back" size=2/></button>
      {:else if number.length > 0}
        <h2>{numberString}</h2>
        <button class="back"
          onpointerup={() => {
            clearTimeout(timeout)
            number = number.slice(0, -1)
          }}
          onpointerdown={() => {
            timeout = setTimeout(() => {
              number = ""
              dtmf = ""
            }, clearTimeout_sec * 1000)
          }}
        >
          <Icon name="arrow_back" size=2/>
        </button>
      {:else}
        <h2 style="color: var(--color-text-dim);">{placeholder}</h2>
        <button class="back hide"><Icon name="arrow_back" size=2/></button>
      {/if}
    </div>
    <Numpad
      on:press={(event) => {
        const pressed = event.detail
        if (inCall) dtmf += pressed
        else if (number.length < 10) number += pressed
      }}
    />
    <div class="callButtons">
      {#if inCall}     
        <button 
          class="end"
          onclick={() => {
            inCall = false
          }}
        >
          <Icon name="call_end" size=2/>
          End
        </button>
      {:else}
        <button 
          class="call"
          onclick={() => {
            dtmf = ""
            inCall = true
          }}
        >
          <Icon name="call" size=2 />
          Call
        </button>
      {/if}
    </div>
  </div>
</section>

<!-- CSS -->
<style>
  section {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    gap: calc(var(--gap)*2);
    align-items: flex-start;
    /* border: var(--border); border-color: red; */
  }
  .number {
    display: flex;
    align-items: center;
  }
  .back {
    padding: 0;
    background-color: transparent;
    /* color: var(--color-font-0); */
  }
  .hide {
    visibility: hidden;
  }
  .smallNum {
    color: var(--color-text-dim);
    font-size: 1rem;
  }
  .dtmf {
    font-size: 1.4rem;
  }
  h2 {
    color: var(--color-text-bright);
    font-family: var(--font-mono);
    margin-right: auto;
  }
  div {
    display: grid;
    gap: var(--gap);
    align-items: flex-start;
    /* border: var(--border); border-color: red; */
  }
  button {
    display: flex;
    gap: var(--gap);
    align-items: center;
    /* user-select: none; */
    background-color: var(--color-bg-secondary);
  }
  .call {
    background-color: var(--color-bg-green);
    color: var(--color-text-green);
  }
  .end {
    background-color: var(--color-bg-red);
    color: var(--color-text-red);
  }
</style>