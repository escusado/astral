import Chroma from "chroma-js";
import ColorPalletes from "util/color-palletes.js";
import GenerateTerrainTile from "util/GenerateTerrainTile";

export default {
  name: "terrain",

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
    if (this.timeElapsed < 2000) {
      return;
    }

    this.timeElapsed = 0;
    this.entities.forEach((entity) => {
      const { height, width } = entity.getAttribute("terrain");
      const vertexPerRow = height + 1;
      const vertexPerCol = width + 1;
      const heightMap = GenerateTerrainTile({
        vertexPerCol,
        vertexPerRow,
        maxHeight: 3,
      });
      entity.setAttribute("terrain", {
        heightMap,
      });
    });
  },
};
