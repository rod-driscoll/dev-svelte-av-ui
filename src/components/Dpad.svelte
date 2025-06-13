<!-- Javascript -->
<script>
  import Icon from './Icon.svelte'
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let { bottomLeft = {
    "show": false,
    "label": "",
    "icon": "home",
    "state": false,
    "toggle": false,
  }, bottomRight = {
    "show": false,
    "label": "",
    "icon": "auto_mode",
    "state": false,
    "toggle": false,
  } } = $props();
  let iconSize = 2.5
</script>

<!-- HTML -->
<div class="grid3x3">

  <button 
    onpointerup={() => dispatch('up', 'in')}
    onpointerout={() => dispatch('up', 'in')}
    onpointerdown={() => dispatch('down', 'in')}
  >
    <Icon name="add" size={iconSize}/>
  </button>
  <button class="up"
    onpointerup={() => dispatch('up', 'up')} 
    onpointerout={() => dispatch('up', 'up')} 
    onpointerdown={() => dispatch('down', 'up')} 
  >
    <Icon name="expand_less" size={iconSize}/>
  </button>
  <button 
    onpointerup={() => dispatch('up', 'out')}
    onpointerout={() => dispatch('up', 'out')}
    onpointerdown={() => dispatch('down', 'out')}
  >
    <Icon name="remove" size={iconSize}/>
  </button>
  
  <button class="left"
    onpointerup={() => dispatch('up', 'left')} 
    onpointerout={() => dispatch('up', 'left')} 
    onpointerdown={() => dispatch('down', 'left')} 
  >
    <Icon name="chevron_left" size={iconSize}/>
  </button>
  <div class="center"
    onpointerup={() => dispatch('up', 'center')} 
    onpointerout={() => dispatch('up', 'center')} 
    onpointerdown={() => dispatch('down', 'center')} 
  >
    <Icon name="" size=1/>
  </div>
  <button class="right"
    onpointerup={() => dispatch('up', 'right')}
    onpointerout={() => dispatch('up', 'right')}
    onpointerdown={() => dispatch('down', 'right')}
  >
    <Icon name="chevron_right" size={iconSize}/>
  </button>
  
  {#if bottomLeft.show}
    <button
      class:on={bottomLeft.state && bottomLeft.toggle}
      onpointerup={() => dispatch('up', 'bottomLeft')}
      onpointerout={() => dispatch('up', 'bottomLeft')}
      onpointerdown={() => dispatch('down', 'bottomLeft')}
    >
      <Icon name={bottomLeft.icon} size={iconSize}/>
      <small>{bottomLeft.label ?? ""}</small>
    </button>
  {:else}
    <div></div>
  {/if}
  <button class="down"
    onpointerup={() => dispatch('up', 'down')}
    onpointerout={() => dispatch('up', 'down')}
    onpointerdown={() => dispatch('down', 'down')}
  >
    <Icon name="expand_more" size={iconSize}/>
  </button>
  {#if bottomRight.show}
    <button 
      class:on={bottomRight.state && bottomRight.toggle}
      onpointerup={() => dispatch('up', 'bottomRight')}
      onpointerout={() => dispatch('up', 'bottomRight')}
      onpointerdown={() => dispatch('down', 'bottomRight')}
    >
      <Icon name={bottomRight.icon} size={iconSize}/>
      <small>{bottomRight.label ?? ""}</small>
    </button>
  {:else}
    <div></div>
  {/if}

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
    --grad-start-color-hover: var(--color-hover);
    --grad-start-color: var(--color-pressed);
    --grad-end-color: transparent;
    --grad-dist: 95%;

    --size: 5rem;
    height: var(--size);
    width: var(--size);
    padding: 0;
    /* position: relative; */
    background-color: var(--color-bg-secondary);
    /* border: var(--border); border-color: red; */
  }
  .on {
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
  }
  .center {
    position: relative;
    --size: 5rem;
    height: var(--size);
    width: var(--size);
    background-color: var(--color-bg-secondary);
  }
  .center::before {
    content: "";
    position: absolute;
    left: 0;
    top: calc(-1*var(--size)*0.27);
    height: calc(var(--size)*1.54);
    width: var(--size);
    background-color: var(--color-bg-secondary);
    /* background-color: red; */
    /* background-color: green; */
  }
  .center::after {
    content: "";
    position: absolute;
    top: 0;
    left: calc(-1*var(--size)*0.27);
    height: var(--size);
    width: calc(var(--size)*1.54);
    background-color: var(--color-bg-secondary);
    /* background-color: red; */
  }
  @media (hover: hover) {
    .right:hover {
      background-image: linear-gradient(to left, var(--grad-start-color-hover), var(--grad-end-color) var(--grad-dist));
      filter: brightness(100%);
    }
    .left:hover {
      background-image: linear-gradient(to right, var(--grad-start-color-hover), var(--grad-end-color) var(--grad-dist));
      filter: brightness(100%);
    }
    .up:hover {
      background-image: linear-gradient(to bottom, var(--grad-start-color-hover), var(--grad-end-color) var(--grad-dist));
      filter: brightness(100%);
    }
    .down:hover {
      background-image: linear-gradient(to top, var(--grad-start-color-hover), var(--grad-end-color) var(--grad-dist));
      filter: brightness(100%);
    }
  }
  .right:active {
    background-image: linear-gradient(to left, var(--grad-start-color), var(--grad-end-color) var(--grad-dist));
    filter: brightness(100%);
  }
  .left:active {
    background-image: linear-gradient(to right, var(--grad-start-color), var(--grad-end-color) var(--grad-dist));
    filter: brightness(100%);
  }
  .up:active {
    background-image: linear-gradient(to bottom, var(--grad-start-color), var(--grad-end-color) var(--grad-dist));
    filter: brightness(100%);
  }
  .down:active {
    background-image: linear-gradient(to top, var(--grad-start-color), var(--grad-end-color) var(--grad-dist));
    filter: brightness(100%);
  }
  .up    { border-radius: var(--radius) var(--radius) 0 0; }
  .right { border-radius: 0 var(--radius) var(--radius) 0; }
  .down  { border-radius: 0 0 var(--radius) var(--radius); }
  .left  { border-radius: var(--radius) 0 0 var(--radius); }
</style>