<script>
  import Box from "components/Box.svelte";

  const boxColor = "#00FFFF";
</script>

<a-scene physics="debug:true; friction: 0.1; restitution: 0.5">

  <a-entity environment="preset: forest; dressingAmount: 500" />

  <Box color={boxColor} />
  <a-mixin id="test" ttl dynamic-body />
  <a-box
    position="-1 3.5 -3"
    rotation="0 45 0"
    color="#4CC3D9"
    shadow
    mixin="test" />
  <a-sphere
    position="0 3.75 -5"
    radius="1.25"
    color="#EF2D5E"
    shadow
    dynamic-body />
  <a-sphere
    position="0 3.75 -5"
    radius="1.25"
    color="#EF2D5E"
    shadow
    dynamic-body />
  <a-cylinder
    position="1 4.0 -3"
    radius="0.5"
    height="1.5"
    color="#FFC65D"
    shadow
    dynamic-body />
  <a-plane
    position="0 0 -4"
    rotation="-90 0 0"
    width="4"
    height="4"
    color="#7BC8A4"
    shadow
    static-body />
  <a-sky color="#ECECEC" />

</a-scene>
