import RandomHeightMap from "util/RandomHeightMap";

export default {
  name: "height-map",

  init: function () {
    this.entities = [];
    this.resetCountdown = 90;
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
      const { height, width } = entity.getAttribute("height-map");
      const vertexPerRow = height + 1;
      const vertexPerCol = width + 1;

      let heightMap;
      if (this.resetCountdown > 1) {
        heightMap = RandomHeightMap.generate({
          vertexPerCol,
          vertexPerRow,
          maxHeight: 3,
        });
        this.resetCountdown -= timeDelta;
      } else {
        this.resetCountdown = 90;
        heightMap = new Array(vertexPerRow)
          .fill(0)
          .map(() =>
            JSON.parse(JSON.stringify(new Array(vertexPerCol).fill(0)))
          );
      }
      entity.setAttribute("height-map", {
        map: heightMap,
      });
    });
  },
};
