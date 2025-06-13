<!-- Javascript -->
<script>
  import Main from './Main.svelte';
  import { run } from 'svelte/legacy';


  // Stores
  import { global } from "../js/global.js";
  import { fade } from 'svelte/transition';

  
  /**
   * @typedef {Object} Props
   * @property {any} pageFiles - Exports
   * @property {any} activePageFile
   * @property {any} activePageConfig
   */

  /** @type {Props} */
  let { pageFiles, activePageFile, activePageConfig } = $props();
  
  // Function
  function getSubpageFiles(hasSubpages, activePageConfig) {
    if (hasSubpages) {
      console.log("Main.svelte getSubpageFiles");
      let subpages = {}
      activePageConfig.subpages.forEach(subpage => {
        let subpageFile = pageFiles[$global.config.pages[subpage]?.file] ?? pageFiles["MissingPage"]
        subpages[subpage] = subpageFile
        let subpageSubpages = $global.config.pages[subpage]?.subpages
        if (subpageSubpages) subpages[subpage].subpages = subpageSubpages
        console.log("Main.svelte getSubpageFiles: ", subpage);
      });
      return subpages
    }
    return false
  }

  // Dynamic Variables
  let editMode = $global.url.search.edit === "true"
  let hasSubpages = $derived(activePageConfig.hasOwnProperty('subpages'))
  let activeSubpageName = $derived(hasSubpages ? activePageConfig.subpages[0] : "")
  let activeSubpageConfig = $derived($global.config.pages[activeSubpageName])
  let activeSubpageFiles = $derived(getSubpageFiles(hasSubpages, activePageConfig))
  
  // Debug
  run(() => {
    console.log("hasSubpages", hasSubpages)
  });
  run(() => {
    console.log("activeSubpageName", activeSubpageName)
  });
  run(() => {
    console.log("activeSubpageFiles", activeSubpageFiles)
  });

</script>

<!-- HTML -->
{#if hasSubpages}
  {console.log("rendering Main.svelte")}

  <!-- Nav and Subpages -->
  <nav>
    {#each activePageConfig.subpages as subpage}
      <!-- on:click={() => {activeSubpageName = subpage; $global.router.subpage = subpage}} -->
      <button
        onclick={() => activeSubpageName = subpage}
        class:active={subpage === activeSubpageName}
      >
        {editMode ? `${$global.config.pages[subpage]?.name} [${$global.config.pages[subpage]?.file}]` : $global.config.pages[subpage]?.name}
      </button>
    {/each}
  </nav>
  
  {#each activePageConfig.subpages as subpage}
    {#if activeSubpageFiles[subpage].subpages && activeSubpageName === subpage}
      {console.log("rendering Main.svelte subpage: ", subpage)}

      <Main 
        pageFiles={pageFiles}
        activePageFile={pageFiles[$global.config.pages[subpage]?.file] || pageFiles["MissingPage"]}
        activePageConfig={$global.config.pages[subpage]}
      />
    {:else}
      {#await activeSubpageFiles[subpage].component() then component}
        {#if activeSubpageName === subpage}        
          <main>
            <component.default config={activeSubpageConfig}/>
          </main>
        {/if}
      {/await}
    {/if}
  {/each}

{:else}

  <!-- Just Page -->
  {#await activePageFile.component() then component}
    <main>
      <component.default config={activePageConfig}/>
    </main>
  {/await}

{/if}

<!-- CSS -->ivePage
<style>
  nav {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    min-height: 4rem;
    background-color: var(--color-header);
  }
  button { 
    flex: 1 0 0%;
    position: relative;
    border-radius: 0;
    white-space: pre;
    color: var(--color-text-dim);
    border-bottom: var(--border);
    border-color: var(--color-header);
  }
  button.active {
    color: var(--color-text-bright);
    border-bottom: var(--border);
    border-color: var(--color-text-dim);
    filter: brightness(100%);
  }
  :global(.body) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  :global(main) {
    flex-grow: 1;
    overflow: auto;
    padding: var(--gap);
    display: flex;
  }
  :global(main > *) {
    margin: auto;
  }
</style>