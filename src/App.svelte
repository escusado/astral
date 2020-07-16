<script>
  import MainScene from "scenes/Main.svelte";

  const Dependencies = [
    "/deps/aframe.js",
    "/deps/ammo.wasm.js",
    "/deps/aframe-physics-system-ammo-build.js"
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
    <MainScene />
  {:else}
    <div style="width: 100px; margin: auto; margin-top: 10%;">
      wait for life...
    </div>
  {/if}
</main>
