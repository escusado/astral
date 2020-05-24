<script>
  const FloorSize = 100;

  const environment = {
    preset: "dream"
    // dressingAmount: 1000,
    // skyType: "gradient",
    // skyColor: "#FFF"
    // horizonColor: "#994"
  };
</script>

<a-entity>
  <a-entity position="0 12 12" rotation="-60 0 0">
    <a-camera wasd-controls="acceleration: 1000" />
  </a-entity>
  <a-entity {environment} />
  <a-plane
    position="0 0 {(FloorSize / 4) * -1}"
    rotation="-90 0 0"
    width={FloorSize}
    height={FloorSize}
    opacity="0"
    shadow
    static-body />

</a-entity>
