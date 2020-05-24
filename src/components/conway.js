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
    MAX_Y = window.CONWAY_CELL_SIZE * 1.8;
    console.log(">>>>", this.MIN_Y, MAX_Y);
  },

  tick: function (time, timeDelta) {
    this.alive = this.system.amIAlive(this.data.id);

    const decreaseDelta = timeDelta / 500 - Math.random() / 100;

    const x = this.el.components.position.data.x;
    const z = this.el.components.position.data.z;

    let y = this.el.components.position.data.y;
    let currentColorIndex = Math.round(
      (this.system.colorScale.length / (MAX_Y - this.MIN_Y)) * (y - this.MIN_Y)
    );

    if (this.alive) {
      y = MAX_Y;
      currentColorIndex = this.system.colorScale.length - 1;
    } else {
      if (y <= this.MIN_Y) {
        y = this.MIN_Y;
        currentColorIndex = Math.round(
          Math.random() * (this.system.colorScale.length / 20)
        );
        return;
      } else {
        y -= decreaseDelta;
      }
    }

    this.el.setAttribute("color", this.system.colorScale[currentColorIndex]);
    this.el.setAttribute("position", { x, y, z });
  },
};
