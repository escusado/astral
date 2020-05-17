<script>
  import Box from "components/Box.svelte";
  import Stage from "components/Stage.svelte";
  import GameOfLife from "components/GameOfLife.svelte";
</script>

<a-scene physics="debug:true; friction: 0.1; restitution: 0.5">
  <Stage />
  <GameOfLife />

</a-scene>
