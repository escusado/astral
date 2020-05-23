<script>
  import { onMount } from "svelte";
  import Rotator from "components/rotator.js";
  import Alive from "components/alive.js";
  import ConwayGrid from "components/conway-grid.js";

  import Cell from "entities/Cell.svelte";

  AFRAME.registerComponent(Rotator.name, Rotator);
  AFRAME.registerComponent(ConwayGrid.name, ConwayGrid);
  AFRAME.registerComponent(Alive.name, Alive);

  const offset = 5;
  const gridSize = 10;
  let conwayGridEl = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
  let otherGrid = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
  const cellColors = {
    alive: "green",
    death: "black"
  };

  let gridTarget;
  const onGeneration = ev => {
    gridTarget = ev.target;
  };
</script>

<a-entity>
  <a-entity
    bind:this={conwayGridEl}
    conway-grid={{ size: gridSize }}
    on:generation={onGeneration} />
  <a-box position="0 2.5 0" rotator="speed: 0.4" shadow />
  {#if gridTarget}
    {#each conwayGridEl as row, x}
      {#each row as cell, y}
        <Cell
          position={`${x - offset} ${0.5 + Math.random() * (1 - 0.5)} ${y - offset}`}
          alive={{ x, y }} />
      {/each}
    {/each}
  {/if}

</a-entity>
