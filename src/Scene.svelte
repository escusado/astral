<script>
  console.log("Rover");

  import Stage from "Stage.svelte";

  import RotatorComponent from "components/rotator.js";
  import HeightMapComponent from "components/height-map.js";
  import RandomColor from "components/random-color.js";
  import UserCameraComponent from "components/user-camera.js";
  import MovementComponent from "components/movement.js";

  import MouseFollowerComponent from "components/mouse-follower.js";
  import MouseFollowerSystem from "systems/mouse-follower.js";

  import UserCameraSystem from "systems/user-camera.js";

  import Terrain from "entities/Terrain.svelte";

  const Systems = [UserCameraSystem, MouseFollowerSystem];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [
    HeightMapComponent,
    RotatorComponent,
    RandomColor,
    UserCameraComponent,
    MovementComponent,
    MouseFollowerComponent,
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
      ammo-shape="type: sphere"
      movement />

    <a-sphere
      user-camera="isCameraSubject: true;"
      color="hotpink"
      position="0 2 0"
      radius="0.2"
      shadow
      mouse-follower />

    <a-entity
      cursor="fuse: true; fuseTimeout: 500"
      position="0 0.5 -1"
      scale="20 20 20"
      geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      material="color: black; shader: flat" />
  </a-entity>
</a-scene>
