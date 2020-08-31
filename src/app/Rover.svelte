<script>
  console.log("Rover");
  import GenerateTerrainTile from "util/GenerateTerrainTile.js";
  import RotatorComponent from "components/rotator.js";
  import Stage from "entities/Stage.svelte";
  import HeightMapTile from "entities/HeightMapTile.svelte";

  import TerrainComponent from "components/terrain.js";
  import TerrainSystem from "systems/terrain.js";

  const Systems = [TerrainSystem];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [TerrainComponent, RotatorComponent];
  Components.forEach((c) => AFRAME.registerComponent(c.name, c));

  /////////////////////////////////////////////////////
  const width = 8;
  const height = 8;
  const vertexPerRow = height + 1;
  const vertexPerCol = width + 1;
  let heightMapData = new Array(vertexPerRow)
    .fill(0)
    .map(() => JSON.parse(JSON.stringify(new Array(vertexPerCol).fill(0))));
  heightMapData = JSON.stringify(heightMapData);
</script>

<a-entity>
  <Stage />
  <a-entity rotation="0 45 0">
    <HeightMapTile {width} {height} {heightMapData} />
  </a-entity>

  <!-- <a-box color="cornflowerblue" width="5" depth="5" position="0 5 0" /> -->
</a-entity>
