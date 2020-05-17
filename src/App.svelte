<script>
  import Text from "components/Text.svelte";
  import Scene from "components/Scene.svelte";

  export let name;

  let isAframeLoaded = false;

  const aFrameLoaded = () => {
    isAframeLoaded = true;
  };

  let loaded = 0;
  const onLoad = () => {
    loaded++;
  };
</script>

<svelte:head>
  <script
    src="https://aframe.io/releases/1.0.4/aframe.js"
    on:load={aFrameLoaded}>

  </script>
  {#if isAframeLoaded}
    <script
      src="//cdn.rawgit.com/donmccurdy/aframe-physics-system/v4.0.1/dist/aframe-physics-system.min.js"
      on:load={onLoad}>

    </script>
    <script
      src="https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"
      on:load={onLoad}>

    </script>
  {/if}

</svelte:head>

<main>
  {#if loaded === 2}
    <Scene />
  {/if}
</main>
