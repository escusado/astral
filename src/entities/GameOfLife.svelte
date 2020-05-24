<script>
  import ConwaySystem from "systems/conway.js";
  import ConwayComponent from "components/conway.js";

  AFRAME.registerSystem(ConwaySystem.name, ConwaySystem);
  AFRAME.registerComponent(ConwayComponent.name, ConwayComponent);

  const gridSize = 50;
  const cellSize = 0.5;
  const offset = (cellSize * gridSize) / 2;
  let conwayGridEl = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
</script>

<a-entity>
  {#each conwayGridEl as row, x}
    {#each row as cell, y}
      <a-box
        scale={`${cellSize} ${cellSize} ${cellSize}`}
        transparent
        opacity="0.1"
        position={`${x * cellSize - offset} 1 ${y * cellSize - offset}`}
        conway={{ id: { x, y, z: 0 } }} />
    {/each}
  {/each}
</a-entity>
