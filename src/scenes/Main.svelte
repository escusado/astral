<script>
  import Box from "entities/Box.svelte";
  import Stage from "entities/Stage.svelte";
  import GameOfLife from "entities/GameOfLife.svelte";
</script>

<a-scene physics="driver: ammo; debug: true; gravity: -9.8; debugDrawMode: 1">
  <Stage />
  <GameOfLife />

</a-scene>
