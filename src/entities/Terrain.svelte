<script>
  import HeightMapTile from "entities/HeightMapTile.svelte";
  import TerrainGenerator from "util/TerrainGenerator";
  import RandomHeightMap from "util/RandomHeightMap";

  const chunkWidth = 8;
  const chunkHeight = 8;
  const chunkVertexPerRow = chunkHeight + 1;
  const chunkVertexPerCol = chunkWidth + 1;
  const totalChunks = 4;
  const chunks = [];

  const map = RandomHeightMap.generate({
    vertexPerRow: chunkHeight * totalChunks + 1,
    vertexPerCol: chunkVertexPerCol,
    maxHeight: 1,
  });
  for (let i = totalChunks - 1; i > -1; i -= 1) {
    const mapClone = JSON.parse(JSON.stringify(map));
    const dataChunk = mapClone.splice(i * chunkWidth, chunkVertexPerCol);
    chunks.unshift(dataChunk);
  }
  // console.table(map);
</script>

<a-entity rotation="15 0 0">
  {#each chunks as chunk, i}
    <HeightMapTile
      position="0 0 {i * chunkHeight}"
      width={chunkWidth}
      height={chunkHeight}
      map={JSON.stringify(chunk)} />
  {/each}
</a-entity>
