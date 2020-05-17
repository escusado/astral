<script>
  import "aframe";
  import "aframe-htmlembed-component";

  function rerender(evt) {
    this.components.htmlembed.forceRender();
  }
</script>

<a-scene>

  <a-entity
    id="mouseCursor"
    cursor="rayOrigin: mouse"
    raycaster="objects: .screen" />
  <a-entity class="screen" position="0 1.6 -1" htmlembed on:click={rerender} />

  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" />
  <a-plane
    position="0 0 -4"
    rotation="-90 0 0"
    width="4"
    height="4"
    color="#7BC8A4" />
  <a-sky color="#ECECEC" />

</a-scene>
