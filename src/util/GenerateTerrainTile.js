const seedCorners = ({ heightMap, maxHeight }) => {
  heightMap[0][0] = Math.random() * maxHeight;
  heightMap[heightMap.length - 1][0] = Math.random() * maxHeight;
  heightMap[0][heightMap[0].length - 1] = Math.random() * maxHeight;
  heightMap[heightMap.length - 1][heightMap[heightMap.length - 1].length - 1] =
    Math.random() * maxHeight;

  return heightMap;
};

const diamondStep = (x, y, stepSize, heightMap) => {
  const c = {
    NW: heightMap[x][y],
    NE: heightMap[x][stepSize],
    SW: heightMap[stepSize][y],
    SE: heightMap[y][stepSize],
  };

  return (c.NW * c.NE * c.SW * c.SE) / 4;
};

const squareStep = (x, y, stepSize, heightMap) => {
  const halfStep = stepSize / 2;

  const Tx = x - halfStep < 0 ? 0 : x - halfStep;
  const Ry =
    y + halfStep > heightMap[0].length - 1
      ? heightMap[0].length - 1
      : y + halfStep;
  const Bx =
    x + halfStep > heightMap[0].length - 1
      ? heightMap[0].length - 1
      : x + halfStep;
  const Ly = y - halfStep < 0 ? 0 : y - halfStep;

  const d = {
    T: heightMap[Tx][y],
    R: heightMap[x][Ry],
    B: heightMap[Bx][y],
    L: heightMap[x][Ly],
  };

  return (d.T * d.R * d.B * d.L) / 4;
};

const GenerateTerrainTile = ({ vertexPerCol, vertexPerRow, maxHeight }) => {
  let heightMap = new Array(vertexPerRow).fill(0);
  for (let i = 0; i < vertexPerRow; i += 1) {
    heightMap[i] = JSON.parse(JSON.stringify(new Array(vertexPerCol).fill(0)));
  }

  heightMap = seedCorners({ heightMap, maxHeight });

  let stepSize = vertexPerCol - 1;
  let entropy = Math.random() * maxHeight;

  while (stepSize > 1) {
    const halfStep = stepSize / 2;
    for (let x = 0; x < vertexPerCol - 1; x += stepSize) {
      for (let y = 0; y < vertexPerRow - 1; y += stepSize) {
        heightMap[x + halfStep][y + halfStep] =
          diamondStep(x, y, stepSize, heightMap) + entropy;
      }
    }

    for (let x = 0; x < vertexPerCol - 1; x += stepSize) {
      for (let y = 0; y < vertexPerRow - 1; y += stepSize) {
        heightMap[x][y + halfStep] = squareStep(
          x,
          y + halfStep,
          stepSize,
          heightMap
        );
        heightMap[x + halfStep][y] = squareStep(
          x + halfStep,
          y,
          stepSize,
          heightMap
        );
        heightMap[x + halfStep][y + stepSize] = squareStep(
          x + halfStep,
          y + stepSize,
          stepSize,
          heightMap
        );
        heightMap[x + stepSize][y + halfStep] = squareStep(
          x + stepSize,
          y + halfStep,
          stepSize,
          heightMap
        );
      }
    }

    stepSize /= 2;
    entropy -= Math.random();
    entropy = entropy < 0 ? 0 : entropy;
  }
  // console.table(heightMap);

  return heightMap;
};

export default GenerateTerrainTile;
