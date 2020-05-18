<script>
  import Box from "entities/Box.svelte";
  import Stage from "entities/Stage.svelte";
  import GameOfLife from "entities/GameOfLife.svelte";
</script>

<a-scene physics="debug:true; friction: 0.1; restitution: 0.5">
  <Stage />
  <GameOfLife />

</a-scene>
