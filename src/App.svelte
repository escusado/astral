<script>
  import Text from "./components/Text.svelte";
  import Scene from "./components/Scene.svelte";

  export let name;
</script>

<main>
  <div>{name}</div>
  <Scene />
</main>
