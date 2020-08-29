<script>
  import Box from "entities/Box.svelte";
  import Stage from "entities/Stage.svelte";

  import Rover from "app/Rover.svelte";
  import GameOfLife from "entities/GameOfLife.svelte";
</script>

<a-scene physics="driver: ammo;">
  <Stage />

  <GameOfLife />
</a-scene>
