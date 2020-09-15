<script>
  import HeightMapTile from "entities/HeightMapTile.svelte";
  import TerrainGenerator from "util/TerrainGenerator";
  import RandomHeightMap from "util/RandomHeightMap";

  const chunkWidth = 10;
  const chunkHeight = 10;
  const chunkVertexPerRow = chunkHeight + 1;
  const chunkVertexPerCol = chunkWidth + 1;
  const totalChunks = 4;
  const chunks = new Array(totalChunks).fill(0);

  const map = RandomHeightMap.generate({
    vertexPerRow: chunkHeight * totalChunks + 1,
    vertexPerCol: chunkVertexPerCol,
    maxHeight: 1,
  });
  for (let i = 0; i < totalChunks; i += 1) {
    const mapClone = JSON.parse(JSON.stringify(map));
    const dataChunk = mapClone.splice(i * chunkWidth, chunkVertexPerCol);
    chunks[i] = dataChunk;
  }
  console.table(chunks);
</script>

<a-entity>
  {#each chunks as chunk, i}
    <HeightMapTile
      position="0 0 {-i * chunkHeight}"
      width={chunkWidth}
      height={chunkHeight}
      map={JSON.stringify(chunk)} />
  {/each}
</a-entity>
