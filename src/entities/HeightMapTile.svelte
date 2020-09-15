<script>
  export let position;
  export let width;
  export let height;
  export let map;
</script>

<a-plane
  {position}
  {width}
  {height}
  height-map="map:{map}; height:{height}; width:{width};"
  segments-width={width}
  segments-height={height}
  shadow="cast: true"
  rotation="-90 0 0"
  random-color
  color="#fff" />
