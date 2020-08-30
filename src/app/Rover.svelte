<script>
  console.log("Rover");
  import Stage from "entities/Stage.svelte";
  import heightMap from "components/height-map.js";
  import rotator from "components/rotator.js";
  import GenerateTerrainTile from "util/GenerateTerrainTile.js";

  const Components = [heightMap, rotator];
  Components.forEach((c) => AFRAME.registerComponent(c.name, c));

  /////////////////////////////////////////////////////

  const width = 6;
  const height = 8;
  const segmentsWidth = width;
  const segmentsHeight = height;

  let generatedTerrain = GenerateTerrainTile({
    width: width + 1,
    height: height + 1,
    maxHeight: 2,
  });

  console.table(generatedTerrain);
  const heightMapData = JSON.stringify(generatedTerrain);
</script>

<a-entity>
  <Stage />
  <a-entity rotator="speed:0.5">
    <a-plane
      {width}
      {height}
      height-map="heightMap:{heightMapData}; height:{height}; width:{width};"
      segments-width={width}
      segments-height={height}
      color="hotpink"
      rotation="-90 0 0" />
  </a-entity>

  <!-- <a-box color="cornflowerblue" width="5" depth="5" position="0 5 0" /> -->
</a-entity>
