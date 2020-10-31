<script>
  import HeightMapTile from "entities/HeightMapTile.svelte";
  import TerrainGenerator from "util/TerrainGenerator";
  import RandomHeightMap from "util/RandomHeightMap";

  const chunkSize = 2; //1m
  const chunkSegments = 8;
  const mapChunksWidth = 10;
  const mapChunksHeight = 10;
  const maxHeight = 0.2;

  const chunkSegmentsWidth = chunkSegments;
  const chunkSegmentsHeight = chunkSegments;
  const chunkVertexPerRow = chunkSegmentsHeight + 1;
  const chunkVertexPerCol = chunkSegmentsWidth + 1;

  const map = RandomHeightMap.generate({
    vertexPerCol: chunkSegmentsHeight * mapChunksWidth + 1,
    vertexPerRow: chunkSegmentsWidth * mapChunksHeight + 1,
    maxHeight,
  });

  //chunkify
  const chunks = JSON.parse(
    JSON.stringify(
      new Array(mapChunksHeight)
        .fill(0)
        .map(() => new Array(mapChunksWidth).fill(0))
    )
  );
  for (let row = 0; row < mapChunksHeight; row += 1) {
    chunks[row] = [];
    for (let col = 0; col < mapChunksWidth; col += 1) {
      let mapClone = JSON.parse(JSON.stringify(map));
      mapClone = mapClone.splice(chunkSegmentsWidth * row, chunkVertexPerCol);
      mapClone = mapClone.map((row) =>
        row.splice(chunkSegmentsWidth * col, chunkVertexPerRow)
      );
      chunks[row][col] = mapClone;
    }
  }
</script>

<a-entity
  position="-{(chunkSize * chunkSegmentsWidth) / 2} 0 -{(chunkSize * chunkSegmentsHeight) / 2}">
  {#each chunks as row, r}
    {#each row as chunk, c}
      <a-plane
        position="{c * chunkSize} 0 {r * chunkSize}"
        width={chunkSize}
        height={chunkSize}
        segments-width={chunkSegmentsWidth}
        segments-height={chunkSegmentsHeight}
        shadow="cast: true"
        rotation="-90 0 0"
        random-color
        mouse-follower
        height-map="map:{JSON.stringify(chunk)}; height:{chunkSegmentsHeight}; width:{chunkSegmentsWidth};" />
    {/each}
  {/each}
</a-entity>
