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
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />

    <a-plane
      position="{0 - PADDING}
      {size / 2}
      {size / 2}"
      rotation="180 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />

    <a-plane
      position="{size / 2}
      {size / 2}"
      rotation="180 90 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />
  </a-entity>

  <a-entity>
    <a-plane
      position="{0 - PADDING} 1 {0 - PADDING}"
      rotation="-90 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />

    <a-plane
      position="{0 - PADDING}
      {size / 2}
      {size / 2}"
      rotation="180 0 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />

    <a-plane
      position="{size / 2}
      {size / 2}"
      rotation="180 90 0"
      width={size + PADDING * 2}
      height={size + PADDING * 2}
      opacity="0"
      shadow
      ammo-body="type: kinematic; emitCollisionEvents: true;
      collisionFilterGroup: 3; collisionFilterMask: 2;"
      ammo-shape="type: box;" />

  </a-entity>

</a-entity>
