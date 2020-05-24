import Chroma from "chroma-js";

const MIN_Y = 0.5;
const MAX_Y = 1.5;

export default {
  name: "conway",

  schema: {
    id: { type: "vec3" },
  },

  init: function () {
    this.darkColor = "";
    this.brightColor = "";
  },

  tick: function (time, timeDelta) {
    // catch reseeded life and update the color pallete
    if (
      this.brightColor !== this.system.brightColor ||
      this.darkColor !== this.system.darkColor
    ) {
      this.brightColor = this.system.brightColor;
      this.darkColor = this.system.darkColor;
      this.colorScale = Chroma.scale([
        "#000000",
        "#333333",
        this.system.darkColor,
        this.system.brightColor,
      ])
        .mode("lch")
        .colors(256);
    }

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
      currentColorIndex = this.colorScale.length;
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

    this.el.setAttribute("position", { x, y, z });
    this.el.setAttribute(
      "color",
      this.colorScale.length === currentColorIndex
        ? "#FFFFFF"
        : this.colorScale[currentColorIndex]
    );
  },
};
