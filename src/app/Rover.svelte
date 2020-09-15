<script>
  console.log("Rover");

  import Stage from "entities/Stage.svelte";

  import HeightMapSystem from "systems/height-map.js";

  import RotatorComponent from "components/rotator.js";
  import HeightMapComponent from "components/height-map.js";
  import RandomColor from "components/random-color.js";
  import Terrain from "entities/Terrain.svelte";

  const Systems = [HeightMapSystem];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [HeightMapComponent, RotatorComponent, RandomColor];
  Components.forEach((c) => AFRAME.registerComponent(c.name, c));
</script>

<a-entity>
  <Stage />

  <Terrain />

  <!-- <a-plane
    receive
    width={width * 10}
    height={height * 10}
    segments-width="1"
    segments-height="1"
    position="0 -0.01 0"
    shadow="receive: true"
    rotation="-90 0 0"
    color="#FFF" /> -->

  <!-- <a-box color="cornflowerblue" width="5" depth="5" position="0 5 0" /> -->
</a-entity>
