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
  segments-width={width}
  segments-height={height}
  shadow="cast: true"
  rotation="-90 0 0"
  color="hotpink"
  height-map="map:{map}; height:{height}; width:{width};" />
