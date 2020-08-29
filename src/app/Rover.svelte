<script>
  console.log("Rover");

  const width = 40;
  const height = 20;
  const segmentsWidth = width - 1;
  const segmentsHeight = height - 1;
</script>

<a-entity>

  <a-plane
    {width}
    {height}
    segments-width={segmentsWidth}
    segments-height={segmentsHeight}
    color="yellow"
    rotation="-90 0 0"
    rotator="speed:0.5;" />

  <a-box color="cornflowerblue" width="5" depth="5" position="0 5 0" />
</a-entity>
