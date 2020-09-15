<script>
  import Box from "entities/Box.svelte";
  import Stage from "entities/Stage.svelte";
  import Rover from "app/Rover.svelte";
  import Ortho from "components/ortho";

  const ortho = AFRAME.registerComponent("ortho", Ortho);
</script>

<a-scene physics="driver: ammo;" shadow="type: pcfsoft">
  <Rover />
</a-scene>
