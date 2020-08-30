export default {
  name: "rotator",

  schema: {
    speed: { type: "number" },
  },

  init: function () {
    this.delta = 0;
  },

  tick: function (time, timeDelta) {
    const currentRotation = this.el.object3D.rotation;

    this.delta += (timeDelta / 10) * this.data.speed;

    this.el.setAttribute("rotation", `0 ${this.delta} 0`);
  },
};
