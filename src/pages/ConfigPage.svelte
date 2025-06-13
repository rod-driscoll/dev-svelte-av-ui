<!-- Javascript -->
<script>
  import formatHighlight from '../js/json-format-highlight.js'

  // Stores
  import { global } from '../js/global.js';
  let { config = $bindable({
    "name": "Configuration Edit",
    "file": "ConfigPage"
  }) } = $props();
  config = config

  // Functions
  function isJSON(str) {
    try { JSON.parse(str) }
    catch (e) { return false }
    return true
  }
  function read(event) {
    text = event.target.innerText
    if (isJSON(text)) badConfig = false
    else badConfig = true
  }
  function format() {
    if (isJSON(text)) {
      obj = JSON.parse(text)
    }
  }
  function reload() {
    location.reload(true)
  }
  function use() {
    if (isJSON(text)) {
      obj = JSON.parse(text)
      $global.config = obj
      console.log("live config", $global.config)
    }
  }
  function save() {
    if (isJSON(text)) {
      obj = JSON.parse(text)
      console.log("saved config", $global.config)
    }
  }
  
  // Variables
  let text = ""
  let obj = $state($global.config)
  let badConfig = $state(false)
  let html = $derived(formatHighlight(obj))

</script>

<!-- HTML -->
<section>
  <div>
    <button onclick={reload}>Reload</button>
    <button onclick={format}>Format</button>
    <button onclick={use} class="right">Live</button>
    <!-- <button on:click={save}>Save</button> -->
    <button onclick={save} disabled>Save</button>
  </div>
  <code
    contenteditable
    spellcheck="false"
    class:bad={badConfig}
    role="textbox"
    oninput={read}
  >
    {@html html}
  </code>
</section>

<!-- CSS -->
<style>
  section {
    display: grid;
  }
  div {
    display: flex;
  }
  code {
    display: block;
    white-space: pre;
    cursor: pointer;
    color: gray;
    font-family: var(--font-mono);
    background-color: black;
    padding: var(--gap);
    border: var(--border);
    border-radius: calc(1rem / 8);
    min-width: 55vw;
    max-height: 70vh;
    overflow: auto;
  }
  [contenteditable] {
    -webkit-user-select: text;
    user-select: text;
  }
  @media (max-height: 799px) { code { max-height: 60vh; font-size: 12px; } }
  @media (max-height: 500px) { code { max-height: 50vh; font-size: 12px; } }
  .bad {
    border-color: tomato;
  }
  .right {
    margin-left: auto;
  }
</style>