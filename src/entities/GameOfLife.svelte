<script>
  import ConwaySystem from "systems/conway.js";
  import ConwayComponent from "components/conway.js";
  import Rotator from "components/rotator.js";

  AFRAME.registerSystem(ConwaySystem.name, ConwaySystem);
  AFRAME.registerComponent(ConwayComponent.name, ConwayComponent);
  AFRAME.registerComponent(Rotator.name, Rotator);

  const gridSize = 50;
  const cellSize = 1;
  const offset = (cellSize * gridSize) / 2;
  let conwayGridEl = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
</script>

<a-entity rotator="speed:0.1">
  {#each conwayGridEl as row, x}
    {#each row as cell, y}
      <a-box
        scale={`${cellSize} ${cellSize} ${cellSize}`}
        position={`${x * cellSize - offset} 1 ${y * cellSize - offset}`}
        conway={{ id: { x, y, z: 0 } }} />
    {/each}
  {/each}
</a-entity>
