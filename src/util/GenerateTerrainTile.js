const seedCorners = ({ heightMap, maxHeight }) => {
  heightMap[0][0] = Math.random() * maxHeight;
  heightMap[heightMap.length - 1][0] = Math.random() * maxHeight;
  heightMap[0][heightMap[0].length - 1] = Math.random() * maxHeight;
  heightMap[heightMap.length - 1][heightMap[heightMap.length - 1].length - 1] =
    Math.random() * maxHeight;

  return heightMap;
};

const GenerateTerrainTile = ({ width, height, maxHeight }) => {
  console.log(">GenerateTerrainTile", width, height, maxHeight);

  let heightMap = new Array(height).fill(0);
  for (let i = 0; i < height; i += 1) {
    heightMap[i] = JSON.parse(JSON.stringify(new Array(width).fill(0)));
  }

  heightMap = seedCorners({ heightMap, maxHeight });

  const stepSize = width - 1;
  const entropy = Math.random() * maxHeight;

  return heightMap;
};

export default GenerateTerrainTile;
