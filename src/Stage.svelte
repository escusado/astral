<script>
  const FloorSize = 100;

  const environment = {
    preset: "dream",
    dressingAmount: 1000,
    skyType: "gradient",
    skyColor: "hotpink",
    horizonColor: "#994",
  };
</script>

<a-entity>
  <a-entity user-camera="isCamera: true;" position="0 3 4" rotation="-60 0 0">
    <a-camera
      look-controls="enabled: false;"
      wasd-controls="enabled: false; acceleration:1000;" />
  </a-entity>
  <a-entity light="color: #fff; type: ambient; intensity: 0.8;" />

  <a-entity
    light="color: #66F; type: directional; castShadow: true; intensity: 0.5;"
    position="3 3 3" />
</a-entity>
