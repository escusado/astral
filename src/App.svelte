<script>
  // import { onMount } from "svelte";
  import Text from "components/Text.svelte";
  import Scene from "components/Scene.svelte";

  export let name;

  let isMounted = false;
  const onLoad = () => {
    isMounted = true;
  };
</script>

<svelte:head>
  <script src="https://aframe.io/releases/1.0.4/aframe.js">

  </script>
  <script
    src="//cdn.rawgit.com/donmccurdy/aframe-physics-system/v4.0.1/dist/aframe-physics-system.min.js"
    on:load={onLoad}>

  </script>
</svelte:head>

<main>
  {#if isMounted}
    <Scene />
  {/if}
</main>
