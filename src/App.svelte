<script>
  import Text from "components/Text.svelte";
  import MainScene from "scenes/Main.svelte";

  const Dependencies = [
    "//aframe.io/releases/1.0.4/aframe.js",
    "//cdn.rawgit.com/donmccurdy/aframe-physics-system/v4.0.1/dist/aframe-physics-system.min.js",
    "//unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"
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
  {/if}
</main>
