<!-- Javascript -->
<script>
  import { run } from 'svelte/legacy';

  
  // Stores
  import { global } from '../js/global.js';

  

  // Components
  import Icon from '../components/Icon.svelte'
  import DpadComponent from '../components/Dpad.svelte'
  import PresetComponent from '../components/Presets.svelte'
  /**
   * @typedef {Object} Props
   * @property {any} [config] - Configuration
   */

  /** @type {Props} */
  let { config = {
    "name": "Video Call",
    "file": "CameraPage",
    "shareListShow": true,
    "savePresetHoldTime_sec": 2,
    "cameras": [
      {
        "id": 0,
        "name": "Camera 0"
      },
      {
        "id": 7,
        "name": "Camera 7",
        "controls": {
          "show": true
        }
      },
      {
        "id": 2,
        "name": "Camera 2",
        "controls": {
          "show": true,
          "showPresets": false
        }
      },
      {
        "id": 3,
        "name": "Camera 3",
        "controls": {
          "show": true,
          "showDpad": false
        }
      },
      {
        "id": 4,
        "name": "Camera 4",
        "controls": {
          "show": true,
          "bottomLeft": {
            "show": true,
            "icon": "home"
          }
        }
      },
      {
        "id": 5,
        "name": "Camera 5",
        "controls": {
          "show": true,
          "bottomLeft": {
            "show": true,
            "icon": "home"
          },
          "bottomRight": {
            "show": true,
            "label": "Auto Track",
            "icon": "auto_mode",
            "toggle": true
          }
        }
      }
    ]
  } } = $props();
  
  // Variables
  let cameras = config.cameras
  let cameraShared = $state(cameras[0])
  let cameraControlled = $state(firstCameraWithControls(cameras))
  let shareListShow = config.shareListShow
  let savePresetHoldTime_sec = config.savePresetHoldTime_sec
  let presetSaved = $state(0)

  // Dynamic Variables
  let controls = $derived(cameraControlled.controls || {
    "show": false,
    "bottomLeft": {
      "show": false
    },
    "bottomRight": {
      "show": false
    }
  })
  let bottomLeft = $derived(controls.bottomLeft || {show: false})
  let bottomRight = $derived(controls.bottomRight || {show: false})

  // Functions
  function firstCameraWithControls(cameras) {
    let first = 0
    cameras.forEach((camera, index) => {
      if (camera.controls && first === 0) first = index
    })
    return cameras[first]
  }
  function setShareCamera(id) {
    cameraShared = cameras.find(camera => camera.id === id)
  }
  function setControlCamera(id) {
    cameraControlled = cameras.find(camera => camera.id === id)
  }
  function dpadDown(event) {
    let button = event.detail
    console.log("dpadDown", button);

    // Reset Preset feedback if camera moves
    cameraControlled.preset = 0
    cameras.find(camera => camera.id === cameraControlled.id).preset = 0

    // Handle the custom dpad buttons
    if (button === "bottomLeft") {
      bottomLeft.state = !bottomLeft.state
    }
    else if (button === "bottomRight") {
      bottomRight.state = !bottomRight.state
    }
  }
  function dpadUp(event) {
    let button = event.detail
    console.log("dpadUp", button);
  }
  function presetRecall(event) {
    let presetId = event.detail
    console.log("recall preset", presetId);

    // Show Preset Feedback
    cameraControlled.preset = presetId
    cameras.find(camera => camera.id === cameraControlled.id).preset = presetId
  }
  function presetSave(event) {
    let presetId = event.detail
    console.log("save preset", presetId);

    // Show Save Feedback
    presetSaved = presetId
    setTimeout(() => presetSaved = 0, 5000);
  }

  // Debug
  run(() => {
    console.log("cameras", cameras)
  });
  run(() => {
    console.log("cameraShared", cameraShared)
  });
  run(() => {
    console.log("cameraControlled", cameraControlled)
  });
  run(() => {
    console.log("presetSaved", presetSaved)
  });

</script>

<!-- HTML -->
<section>

  <!-- If more than one camera show share and control -->
  {#if cameras.length > 1}

    <!-- Share -->
    {#if shareListShow}
      <div>
        <h4>Share</h4>
        {#each cameras as camera}
          <button
            class:selected={cameraShared.id === camera.id}
            onclick={() => setShareCamera(camera.id)}
          >
            <Icon name="videocam" size=2 />
            {camera.name}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Control -->
    <div>
      <h4>Control</h4>
      {#each cameras as camera}
        {#if camera.controls?.show}
          <button
            class:selected={cameraControlled.id === camera.id}
            onclick={() => setControlCamera(camera.id)}
          >
            <Icon name="videocam" size=2 />
            {camera.name}
          </button>
        {/if}
      {/each}
    </div>
    
  {/if}
  
  <!-- Controls -->
  {#if controls.show}

    <!-- Dpad -->
    {#if controls.showDpad ?? true}
      <div>
        <h4>{cameraControlled.name} Controls</h4>
        <DpadComponent
          on:down={dpadDown}
          on:up={dpadUp}
          bottomLeft={bottomLeft}
          bottomRight={bottomRight}
        />
      </div>
    {/if}

    <!-- Presets -->
    {#if controls.showPresets ?? true}
      <div>
        <h4>Presets</h4>
        <PresetComponent
          on:recall={presetRecall}
          on:save={presetSave}
          selected={cameraControlled.preset}
          savePresetHoldTime_sec={savePresetHoldTime_sec}
        />
        <span>Hold preset to save</span>
        {#if presetSaved !== 0}
          <p>Saved preset {presetSaved}</p>
        {:else}
          <pre><p> </p></pre>
        {/if}
      </div>
    {/if}
  {/if}

</section>

<!-- CSS -->
<style>
  section {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    gap: calc(var(--gap)*2);
    align-items: flex-start;
    justify-content: center;
    /* border: var(--border); border-color: red; */
  }
  div {
    display: grid;
    gap: var(--gap);
    align-items: flex-start;
    max-height: 70vh;
    overflow: auto;
    /* border: var(--border); border-color: red; */
  }
  button {
    display: flex;
    gap: var(--gap);
    align-items: center;
    background-color: var(--color-bg-secondary);
    min-width: 10rem;
  }
  button.selected {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
  }
  span {
    color: var(--color-text-dim);
  }
</style>