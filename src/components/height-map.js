/*

 by http://toy.codes 2020

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

export default {
  name: "height-map",

  schema: {
    chunkId: { type: "number" },
    map: { type: "string" },
    width: { type: "number" },
    height: { type: "number" },
  },

  init: function () {
    this.data.map = JSON.parse(this.data.map);
    this.animationDelta = 0;
    this.setMap();
  },

  setMap: function () {
    const chunkMap = this.data.map;
    const newMesh = new THREE.Mesh(
      this.el.getObject3D("mesh").geometry.clone(),
      this.el.getObject3D("mesh").material.clone()
    );
    const vertices = newMesh.geometry.attributes.position.array;
    console.log("vertssices", chunkMap);
    let currentQuadRow = 0;
    let currentQuadCol = 0;

    for (
      let currentQuad = 0;
      currentQuad < vertices.length;
      currentQuad += 18 // [x,y,Z] * 3 Vertices per Triangle * 2 Triangles
    ) {
      const quadrantVertexZValues = {
        NW: chunkMap[currentQuadRow][currentQuadCol],
        NE: chunkMap[currentQuadRow][currentQuadCol + 1],
        SW: chunkMap[currentQuadRow + 1][currentQuadCol],
        SE: chunkMap[currentQuadRow + 1][currentQuadCol + 1],
      };

      // Triangle 1
      vertices[currentQuad + 2] = quadrantVertexZValues.NW;
      vertices[currentQuad + 5] = quadrantVertexZValues.SW;
      vertices[currentQuad + 8] = quadrantVertexZValues.NE;

      // Triangle 2
      vertices[currentQuad + 11] = quadrantVertexZValues.SW;
      vertices[currentQuad + 14] = quadrantVertexZValues.SE;
      vertices[currentQuad + 17] = quadrantVertexZValues.NE;

      currentQuadCol += 1;
      if (currentQuadCol === this.data.width) {
        currentQuadCol = 0;
        currentQuadRow += 1;
      }
    }
    this.el.setObject3D("mesh", newMesh);
    this.el.getObject3D("mesh").geometry.attributes.position.needsUpdate = true;
    this.el.getObject3D("mesh").geometry.computeVertexNormals();

    //set collisions
    this.el.setAttribute("ammo-body", "type: static");
    this.el.setAttribute("ammo-shape", "type: mesh");
  },
};
