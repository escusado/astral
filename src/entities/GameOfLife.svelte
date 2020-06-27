<script>
  window.CONWAY_GRID_SIZE = 20;
  window.CONWAY_CELL_SIZE = 1.2;

  import CubeBounds from "entities/CubeBounds.svelte";

  import ConwayComponent from "components/conway.js";
  import Rotator from "components/rotator.js";
  import ConwaySeed from "components/conway-seed.js";
  import ConwaySystem from "systems/conway.js";

  AFRAME.registerSystem(ConwaySystem.name, ConwaySystem);
  AFRAME.registerComponent(ConwayComponent.name, ConwayComponent);
  AFRAME.registerComponent(Rotator.name, Rotator);
  AFRAME.registerComponent(ConwaySeed.name, ConwaySeed);

  const gridSize = window.CONWAY_GRID_SIZE;
  const cellSize = window.CONWAY_CELL_SIZE;
  const offset = (cellSize * gridSize) / 2;
  let conwayGridEl = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
</script>

<a-entity rotator="speed:0.01">
  <CubeBounds size={gridSize * cellSize} />
  <a-sphere
    position="0 3.75 -5"
    radius="0.5"
    color="#22aaFF"
    shadow
    conway-seed
    ammo-body="type: dynamic; emitCollisionEvents: true; collisionFilterGroup:
    3; collisionFilterMask: 2;"
    ammo-shape="type: sphere;" />
  {#each conwayGridEl as row, x}
    {#each row as cell, y}
      <a-box
        ammo-body="type: kinematic; emitCollisionEvents: true;
        collisionFilterGroup: 3; collisionFilterMask: 2;"
        ammo-shape="type: box;"
        shadow="cast: true; receive: true"
        scale={`${cellSize} ${cellSize} ${cellSize}`}
        position={`${x * cellSize - offset} 1 ${y * cellSize - offset}`}
        conway={{ id: { x, y, z: 0 } }} />
    {/each}
  {/each}
</a-entity>
