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
    // console.log(vertices);
    const vertexPerRow = this.data.width + 1;
    const vertexPerCol = this.data.height + 1;
    let quadIndex = 0;
    for (let i = 0; i < vertices.length; i += 18) {
      /* Quadrant vertex coords
          ----
          |  |
          ----
         NW=[?,?]
      */

      const row = quadIndex === 0 ? 0 : Math.floor(quadIndex / 18);
      const col = quadIndex === 0 ? 0 : Math.floor(quadIndex / 18);

      // console.log(">quadIndex", quadIndex);
      // console.log(">row", row);
      // console.log(">col", col);
      // console.log("-------------");

      // const coords = {
      //   NW: [X, Y],
      //   NE: [X, Y],

      //   SW: [X, Y],
      //   SE: [X, Y],
      // };

      const quadrant = [
        this.data.heightMap[quadIndex],
        this.data.heightMap[quadIndex],

        this.data.heightMap[quadIndex],
        this.data.heightMap[quadIndex],
      ];

      // Triangle 1
      // vertices[i + 2] = this.data.heightMap[quadIndex];
      // vertices[i + 5] = this.data.heightMap[quadIndex + 2];
      // vertices[i + 8] = this.data.heightMap[quadIndex + 1];

      // // Triangle 2
      // vertices[i + 11] = this.data.heightMap[quadIndex + 2];
      // vertices[i + 14] = this.data.heightMap[quadIndex + 3];
      // vertices[i + 17] = this.data.heightMap[quadIndex + 1];

      quadIndex += 1;
    }

    this.el.object3D.el.components.geometry.geometry.attributes.position.needsUpdate = true;
    this.el.object3D.el.components.geometry.geometry.computeVertexNormals();
    // console.log(">", "---", mapIndex);

    // vertices.forEach((vertex) => {
    //   // console.log(">>>v", vertex);
    // });
    // const currentRotation = this.el.object3D.rotation;
    // this.delta += (timeDelta / 10) * this.data.speed;
    // this.el.setAttribute("rotation", `0 ${this.delta} 0`);
    // console.log(">>>", vertices);
    // debugger;
  },
};
