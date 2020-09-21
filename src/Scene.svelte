<script>
  console.log("Rover");

  import Stage from "Stage.svelte";

  import RotatorComponent from "components/rotator.js";
  import HeightMapComponent from "components/height-map.js";
  import RandomColor from "components/random-color.js";
  import UserCameraComponent from "components/user-camera.js";

  import UserCameraSystem from "systems/user-camera.js";

  import Terrain from "entities/Terrain.svelte";

  const Systems = [UserCameraSystem];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [
    HeightMapComponent,
    RotatorComponent,
    RandomColor,
    UserCameraComponent,
  ];
  Components.forEach((c) => AFRAME.registerComponent(c.name, c));
</script>

<a-scene physics="driver: ammo;" shadow="type: pcfsoft">
  <a-entity>
    <Stage />

    <Terrain />

    <a-sphere
      user-camera="isCameraSubject: true;"
      random-color
      position="0 2 0"
      radius="0.2"
      color="#22aaFF"
      shadow
      ammo-body="type: dynamic"
      ammo-shape="type: sphere" />
  </a-entity>
</a-scene>
