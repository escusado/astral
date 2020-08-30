import Chroma from "chroma-js";
import ColorPalletes from "util/color-palletes.js";
import GenerateTerrainTile from "util/GenerateTerrainTile";

export default {
  name: "terrain",

  schema: {
    width: { type: "number" },
    height: { type: "number" },
  },

  init: function () {
    this.entities = [];
  },

  registerMe: function (el) {
    this.entities.push(el);
  },

  unregisterMe: function (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  },

  tick: function (time, timeDelta) {
    this.timeElapsed += timeDelta;
    if (this.timeElapsed < 1000) {
      // return;
    }

    this.timeElapsed = 0;
    this.entities.forEach((entity) => {
      const { height, width } = entity.getAttribute("terrain");
      setTimeout(() => {
        const vertexPerRow = height + 1;
        const vertexPerCol = width + 1;
        let generatedTerrain = GenerateTerrainTile({
          width: vertexPerCol,
          height: vertexPerRow,
          maxHeight: 2,
        });
        const heightMap = generatedTerrain;
        entity.setAttribute("terrain", {
          heightMap,
        });
      }, 1000);
    });
  },
};
