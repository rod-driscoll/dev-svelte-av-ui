<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- Javascript -->
<script>
  let {
    fill = true,
    name = "star",
    size = 1
  } = $props();
</script>

<!-- HTML -->
<i 
  class="icon {fill ? "fill" : ""}" 
  style={`font-size: ${size}em; ${$$props.style}`}
>
  {name}
</i>

<!-- CSS -->
<style>
  i {
    vertical-align: -4px;
  }
</style>