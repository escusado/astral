<script>
  import HeightMapTile from "entities/HeightMapTile.svelte";
  import TerrainGenerator from "util/TerrainGenerator";

  const width = 8;
  const height = 8;
  const vertexPerRow = height + 1;
  const vertexPerCol = width + 1;
  let heightMapData = new Array(vertexPerRow)
    .fill(0)
    .map(() => JSON.parse(JSON.stringify(new Array(vertexPerCol).fill(0))));
  heightMapData = JSON.stringify(heightMapData);

  const terrainGenerator = new TerrainGenerator();
  const terrain = terrainGenerator.generate();
  console.log("????GenerateTerrain", terrain);
</script>

<a-entity rotator="speed:0.1">
  <HeightMapTile {width} {height} {heightMapData} />
</a-entity>
