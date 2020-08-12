<script>
  const FloorSize = 100;

  const environment = {
    preset: "dream",
    dressingAmount: 1000,
    skyType: "gradient",
    skyColor: "#FFF",
    horizonColor: "#994",
  };
</script>

<a-entity>
  <a-entity
    position="0 12 12"
    rotation={`${AFRAME.utils.device.isMobile() ? -5 : -60} 0 0`}>
    <a-camera
      look-controls="touchEnabled: false;"
      wasd-controls="enabled: true; acceleration:1000;" />
  </a-entity>
  <a-entity light="type: ambient; intensity: 0.8;" />
  <a-entity
    light="type: directional; castShadow: true; intensity: 0.5;"
    position="-5 3 1.5" />

</a-entity>
