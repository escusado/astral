<script>
  const PADDING = 0;
  export let size;
</script>

<a-entity>

  <a-entity rotation="180 90 0" position="0 {size} 0">
    <a-plane
      position="{0 - PADDING} 1 {0 - PADDING}"
      rotation="-90 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#EF2D5E"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />

    <a-plane
      position="{0 - PADDING}
      {size / 2}
      {size / 2}"
      rotation="180 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#332D5E"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />

    <a-plane
      position="{size / 2}
      {size / 2}"
      rotation="180 90 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#332DFF"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />
  </a-entity>

  <a-entity>
    <a-plane
      position="{0 - PADDING} 1 {0 - PADDING}"
      rotation="-90 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#EF2D5E"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />

    <a-plane
      position="{0 - PADDING}
      {size / 2}
      {size / 2}"
      rotation="180 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#332D5E"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />

    <a-plane
      position="{size / 2}
      {size / 2}"
      rotation="180 90 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0.2"
      shadow
      color="#332DFF"
      ammo-body="type: kinematic;"
      ammo-shape="type: box;" />

  </a-entity>

</a-entity>
