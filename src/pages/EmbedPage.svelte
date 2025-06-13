<!-- Javascript -->
<script>
  import { run } from 'svelte/legacy';


  // Stores
  import { global } from '../js/global.js';

  
  /**
   * @typedef {Object} Props
   * @property {any} [config] - Configuration
   */

  /** @type {Props} */
  let { config = {
    "name": "YouTube",
    "file": "UrlEmbedPage",
    "url": "https://www.google.com/"
  } } = $props();

  // Components
  // import Keypad from '../components/Keypad.svelte'

  // Variables
  let url = config.url

  // Debug
  run(() => {
    console.log("config", config)
  });

</script>

<!-- HTML -->
<embed title={url} src={url} type="application/pdf">

<!-- CSS -->
<style>
  embed {
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>