import Chroma from "chroma-js";

const MIN_Y = 0.5;
const MAX_Y = 1.5;

export default {
  name: "conway",

  schema: {
    id: { type: "vec3" },
  },

  init: function () {
    this.colorScale = Chroma.scale([
      "#000",
      "#333333",
      "#660044",
      // "#00ff00",
      "#FFff00",
    ])
      .mode("lch")
      .colors(256);
  },

  tick: function (time, timeDelta) {
    const decreaseDelta = timeDelta / 1000 - Math.random() / 100;
    const alive = this.system.amIAlive(this.data.id);
    const x = this.el.components.position.data.x;
    const z = this.el.components.position.data.z;

    let y = this.el.components.position.data.y;
    let currentColorIndex = Math.round(
      (this.colorScale.length / (MAX_Y - MIN_Y)) * (y - MIN_Y)
    );

    if (alive) {
      y = MAX_Y;
      currentColorIndex = this.colorScale.length - 1;
      // currentColorIndex = Math.round(
      //   Math.random() *
      //     (this.colorScale.length -
      //       (this.colorScale.length - this.colorScale.length / 8)) +
      //     (this.colorScale.length - this.colorScale.length / 8)
      // );
    } else {
      if (y <= MIN_Y) {
        y = MIN_Y;
        currentColorIndex = Math.round(
          Math.random() * (this.colorScale.length / 20)
        );
      } else {
        y -= decreaseDelta;
      }
    }

    // if (this.data.id.x == 10 && this.data.id.y == 10) {
    //   console.log(">>>>", currentColorIndex);
    // }
    this.el.setAttribute("position", { x, y, z });
    this.el.setAttribute("color", this.colorScale[currentColorIndex]);
  },
};
