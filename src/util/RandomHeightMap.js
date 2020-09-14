class RandomHeightMap {
  generate({ vertexPerCol, vertexPerRow, maxHeight }) {
    const heightMap = new Array(vertexPerRow)
      .fill(0)
      .map(() =>
        JSON.parse(
          JSON.stringify(
            new Array(vertexPerCol)
              .fill(0)
              .map((item) => (item = Math.random() * maxHeight))
          )
        )
      );

    for (let i = 0; i < vertexPerCol; i += 1) {
      heightMap[0][i] = 0;
      heightMap[i][0] = 0;
      heightMap[vertexPerCol - 1][i] = 0;
      heightMap[i][vertexPerCol - 1] = 0;
    }

    return heightMap;
  }
}

export default new RandomHeightMap();
