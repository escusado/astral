<script>
  import Rotator from "components/rotator.js";
  import ConwayGrid from "components/conway-grid.js";

  AFRAME.registerComponent(Rotator.name, Rotator);
  AFRAME.registerComponent(ConwayGrid.name, ConwayGrid);

  const cellColors = {
    alive: "green",
    death: "black"
  };
</script>

<a-entity>
  <a-entity conway-grid />
  <a-box position="0 0.5 0" rotator="speed: 0.4" color="#FFF" shadow />
</a-entity>
