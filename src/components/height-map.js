export default {
  name: "height-map",

  schema: {
    heightMap: { type: "string" },
    width: { type: "number" },
    height: { type: "number" },
  },

  init: function () {
    this.data.heightMap = JSON.parse(this.data.heightMap);
    console.log("this.data.heightMap", this.data.heightMap);
    // window.MYVAR = 0;
    // setInterval(() => {
    //   // console.log("tick", window.MYVAR);
    //   window.MYVAR += 1;
    //   window.MYVAR = window.MYVAR === 12 ? 0 : window.MYVAR;
    // }, 1000);
  },

  tick: function (time, timeDelta) {
    // debugger;
    const vertices = this.el.object3D.el.components.geometry.geometry.attributes
      .position.array;

    /*
 1 Quadrant has 2 Triangles that have 6 vertex combined per Quadrant  
 THREE.PlaneBufferGeometry created by AFrame stores them like:
 0------2
  | 0 /|
  |  / |
  | /  |
  |/ 1 |
 1------

  ------5
  | 0 /|
  |  / |
  | /  |
  |/ 1 |
 3------4

 Vertex 0 is defined in THREE by [X,Y,Z] point in space

 Heighmap

    witdth x height
    (i.e.)
    
    width=1 & height=2
    0----1
     |  |
    2----3
     |  |
    4----5   

    width=3 & height=2
     0--1--2--3
     |0 |1 |2 |
     4--5--6--7
     |3 |4 |5 |
     8--9--X--11  

    Heightmap =
    [   0:1:2:3:
    0: [0,1,2,3],
    1: [4,5,6,7],
    2: [8,9,X,11],
    ]

    vertexHeight = [row, col]

    Quadrant 4
    5--6
    |4 |
    9--X
    
    Quadrant 4 vertex coords
    NW = v5 = HM[1,1]          NE = v6 = HM[1,2]
                        ----
                        |4 |
                        ----
    SW = v9 = HM[2,1]          SE = vX = HM[2,2]
    
*/

    let quadIndex = 0;
    let currentQuadRow = 0;
    let currentQuadCol = 0;
    for (let i = 0; i < vertices.length; i += 18) {
      const quadrantVertexZValues = {
        NW: this.data.heightMap[currentQuadRow][currentQuadCol],
        NE: this.data.heightMap[currentQuadRow][currentQuadCol + 1],
        SW: this.data.heightMap[currentQuadRow + 1][currentQuadCol],
        SE: this.data.heightMap[currentQuadRow + 1][currentQuadCol + 1],
      };

      // Triangle 1
      vertices[i + 2] = quadrantVertexZValues.NW;
      vertices[i + 5] = quadrantVertexZValues.SW;
      vertices[i + 8] = quadrantVertexZValues.NE;

      // Triangle 2
      vertices[i + 11] = quadrantVertexZValues.SW;
      vertices[i + 14] = quadrantVertexZValues.SE;
      vertices[i + 17] = quadrantVertexZValues.NE;

      quadIndex += 1;
      currentQuadCol += 1;
      if (currentQuadCol === this.data.width) {
        currentQuadCol = 0;
        currentQuadRow += 1;
      }
    }

    this.el.object3D.el.components.geometry.geometry.attributes.position.needsUpdate = true;
    this.el.object3D.el.components.geometry.geometry.computeVertexNormals();
  },
};
