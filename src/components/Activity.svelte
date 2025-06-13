<!-- Javascript -->
<script>
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Icon from './Icon.svelte'

  

  // Stores
  import { global } from '../js/global.js';
  /**
   * @typedef {Object} Props
   * @property {number} [id] - Exports
   * @property {string} [name]
   * @property {string} [icon]
   * @property {string} [color]
   * @property {string} [file]
   * @property {string} [page]
   * @property {string} [popup]
   */

  /** @type {Props} */
  let {
    id = 0,
    name = "Activity",
    icon = "star",
    color = "grey",
    file = "",
    page = "",
    popup = ""
  } = $props();
  let editMode = $global.url.search.edit === "true"

</script>

<!-- HTML -->
<button
  id="activity-{id}"
  onclick={bubble('click')}
  style="
    color: var(--color-text-{color});
    background-color: var(--color-bg-{color});
  "
>
  <Icon name="{icon}" size=3.5/>
  <div> {name} {editMode ? `[${id}]` : ""} </div>
  <div hidden> {file} </div>
  <div hidden> {page} </div>
  <div hidden> {popup} </div>
</button>

<!-- CSS -->
<style>
  button {
    border-radius: var(--radius-2);
    padding: var(--padding);
    box-shadow: var(--shadow);
    
    width: 12rem;
    height: 12rem;
    font-size: 1.4rem;
  }
  /* @media (max-width: 1280px) {
    button {
      width: 14rem;
      height: 14rem;
      font-size: 1.6rem;
    }
  }
  @media (max-width: 550px) {
    button {
      margin: 0;
      width: 12rem;
      height: 12rem;
      font-size: 1.2rem;
    }
  }
  @media (max-width: 360px) {
    button {
      margin: 0;
      width: 8rem;
      height: 8rem;
      font-size: .9rem;
    }
  } */
</style>