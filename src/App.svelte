<script>
  import Scene from "Scene.svelte";

  const Dependencies = [
    "/deps/aframe.js",
    "/deps/ammo.wasm.js",
    "/deps/aframe-physics-system-ammo-build.js",
    "/deps/chroma.min.js",
  ];

  // ordered dependency loader
  let dependenciesLoaded = false;
  let reloading = true;
  let currentDependency = 0;
  const onDependencyLoad = () => {
    reloading = false;
    currentDependency++;
    if (currentDependency === Dependencies.length) {
      dependenciesLoaded = true;
    }
    setTimeout(() => (reloading = true), 0); // force re-render to load new js
  };
</script>

<svelte:head>
  {#if reloading}
    <script src={Dependencies[currentDependency]} on:load={onDependencyLoad}>
    </script>
  {/if}
</svelte:head>

<main>
  {#if dependenciesLoaded}
    <Scene />
  {:else}
    <div style="width: 100px; margin: auto; margin-top: 10%;" />
  {/if}
</main>
