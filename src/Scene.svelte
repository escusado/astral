<script>
  console.log("Rover");

  import Stage from "Stage.svelte";

  import RotatorComponent from "components/rotator.js";
  import HeightMapComponent from "components/height-map.js";
  import RandomColor from "components/random-color.js";
  import Terrain from "entities/Terrain.svelte";

  const Systems = [];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [HeightMapComponent, RotatorComponent, RandomColor];
  Components.forEach((c) => AFRAME.registerComponent(c.name, c));
</script>

<a-scene physics="driver: ammo;" shadow="type: pcfsoft">
  <a-entity>
    <Stage />

    <Terrain />

    <a-sphere
      position="0 2 0"
      radius="0.5"
      color="#22aaFF"
      shadow
      ammo-body="type: dynamic;"
      ammo-shape="type: sphere;" />

    <a-box color="cornflowerblue" width="1" depth="1" position="0 2 0" />s
  </a-entity>
</a-scene>
