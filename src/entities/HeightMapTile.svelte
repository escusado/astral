<script>
  export let width;
  export let height;
  export let heightMapData;
</script>

<a-plane
  {width}
  {height}
  terrain="heightMap:{heightMapData}; height:{height}; width:{width};"
  segments-width={width}
  segments-height={height}
  color="hotpink"
  rotation="-90 0 0"
  wireframe="true" />
