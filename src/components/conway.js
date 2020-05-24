let MAX_Y;
export default {
  name: "conway",

  schema: {
    id: { type: "vec3" },
  },

  init: function () {
    this.alive = false;
    this.MIN_Y =
      window.CONWAY_CELL_SIZE + (Math.random() * window.CONWAY_CELL_SIZE) / 4;
    MAX_Y = window.CONWAY_CELL_SIZE * 1.8; // 1.8 to prevent the cube to fully go up
  },

  tick: function (time, timeDelta) {
    this.alive = this.system.amIAlive(this.data.id);

    // random dying speed
    const decreaseDelta = timeDelta / 500 - Math.random() / 100;

    const x = this.el.components.position.data.x;
    const z = this.el.components.position.data.z;

    let y = this.el.components.position.data.y;
    let currentColorIndex = Math.round(
      (this.system.colorScale.length / (MAX_Y - this.MIN_Y)) * (y - this.MIN_Y)
    );

    if (this.alive) {
      // become alive
      y = MAX_Y;
      currentColorIndex = this.system.colorScale.length - 1;
    } else {
      // totally death do nothing
      if (y <= this.MIN_Y) {
        return;
      } else {
        // dying
        y -= decreaseDelta;
      }
    }

    // random last color oscilating between the first 10% of the scale
    if (y <= this.MIN_Y) {
      currentColorIndex = Math.round(
        Math.random() * (this.system.colorScale.length / 8)
      );
    }

    this.el.setAttribute(
      "color",
      this.system.colorScale[currentColorIndex] ||
        this.system.colorScale[this.system.colorScale.length - 1]
    );
    this.el.setAttribute("position", { x, y, z });
  },
};
