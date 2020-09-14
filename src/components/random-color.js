import ColorPalletes, { randomColorScale } from "util/color-palettes.js";

export default {
  name: "random-color",

  schema: {
    delta: { type: "number", default: 1 },
    colorIndex: { type: "number", default: 1 },
  },

  init: function () {
    console.log(">>>>", this.scale);
    this.colorIndex = this.data.colorIndex;
    this.delta = this.data.delta;
  },

  tick: function (time, timeDelta) {
    this.delta =
      this.colorIndex > 254 || this.colorIndex < 1
        ? (this.delta *= -1)
        : this.delta;
    this.el.setAttribute("color", randomColorScale[this.colorIndex]);
    this.colorIndex += this.delta;

    // const currentRotation = this.el.object3D.rotation;
    // this.delta += (timeDelta / 10) * this.data.speed;
    // this.el.setAttribute("rotation", `0 ${this.delta} 0`);
  },
};
