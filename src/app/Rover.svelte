<script>
  console.log("Rover");
  import GenerateTerrainTile from "util/GenerateTerrainTile.js";

  import Stage from "entities/Stage.svelte";
  import HeightMapTile from "entities/HeightMapTile.svelte";

  import TerrainSystem from "systems/terrain.js";

  import RotatorComponent from "components/rotator.js";
  import TerrainComponent from "components/terrain.js";
  import RandomColor from "components/random-color.js";

  const Systems = [TerrainSystem];
  Systems.forEach((s) => AFRAME.registerSystem(s.name, s));

  const Components = [TerrainComponent, RotatorComponent, RandomColor];
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

  <!-- <Terrain /> -->

  <a-entity rotator="speed:0.1">
    <HeightMapTile {width} {height} {heightMapData} />
  </a-entity>

  <a-plane
    receive
    width={width * 10}
    height={height * 10}
    segments-width="1"
    segments-height="1"
    position="0 -0.01 0"
    shadow="receive: true"
    rotation="-90 0 0"
    color="#FFF" />

  <!-- <a-box color="cornflowerblue" width="5" depth="5" position="0 5 0" /> -->
</a-entity>
