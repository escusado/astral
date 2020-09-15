<script>
  import HeightMapTile from "entities/HeightMapTile.svelte";
  import TerrainGenerator from "util/TerrainGenerator";
  import RandomHeightMap from "util/RandomHeightMap";

  const chunkWidth = 10;
  const chunkHeight = 10;
  const chunkVertexPerRow = chunkHeight + 1;
  const chunkVertexPerCol = chunkWidth + 1;
  const totalChunks = 4;
  const chunks = [];

  for (let i = 0; i < totalChunks; i += 1) {
    chunks.push(
      RandomHeightMap.generate({
        vertexPerCol: chunkVertexPerCol,
        vertexPerRow: chunkVertexPerRow,
        maxHeight: 1,
      })
    );
  }
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
