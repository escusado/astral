import Chroma from "chroma-js";
import { getRandomColorPalette } from "util/color-palettes.js";

export default {
  name: "random-color",

  schema: {
    delta: { type: "number", default: 1 },
    colorIndex: { type: "number", default: 1 },
  },

  init: function () {
    this.colorIndex = this.data.colorIndex;
    this.delta = this.data.delta;
    this.scale = Chroma.scale(getRandomColorPalette()).mode("lch").colors(256);
  },

  tick: function (time, timeDelta) {
    this.delta =
      this.colorIndex > 254 || this.colorIndex < 1
        ? (this.delta *= -1)
        : this.delta;
    this.el.setAttribute("color", this.scale[this.colorIndex]);
    this.colorIndex += this.delta;
  },
};
