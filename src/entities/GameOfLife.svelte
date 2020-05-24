<script>
  import { onMount } from "svelte";

  import ConwaySystem from "systems/conway.js";

  import Rotator from "components/rotator.js";
  import Alive from "components/alive.js";
  import ConwayComponent from "components/conway.js";

  import Cell from "entities/Cell.svelte";

  AFRAME.registerSystem(ConwaySystem.name, ConwaySystem);
  AFRAME.registerComponent(ConwayComponent.name, ConwayComponent);

  const offset = 5;
  const gridSize = 10;
  let conwayGridEl = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
</script>

<a-entity>
  {#each conwayGridEl as row, x}
    {#each row as cell, y}
      <a-box
        transparent
        opacity="0.8"
        shadow
        position={`${x - offset} ${0.5 + Math.random() * (1 - 0.5)} ${y - offset}`}
        conway={{ id: { x, y, z: 0 } }} />
    {/each}
  {/each}

</a-entity>
