const PITCH = { w: -1, s: 1 };
const ROLL = { a: -1, d: 1 };

export default {
  name: "movement",

  // schema: {
  //   // speed: { type: "number" },
  // },

  init: function () {
    this.key = "";

    window.addEventListener(
      "keydown",
      (event) => {
        const key = event.key.toLowerCase();

        if ("wasd".indexOf(key) > -1) {
          this.key = key;
        }
      },
      false
    );

    window.addEventListener(
      "keyup",
      (event) => {
        this.key = "";
      },
      false
    );
  },

  tick: function (time, timeDelta) {
    if (this.key) {
      this.el.body.setLinearVelocity(
        new Ammo.btVector3(ROLL[this.key] || 0, 0, PITCH[this.key] || 0)
      );
    }

    // this.delta += (timeDelta / 10) * this.data.speed;
    // console.log(">>>", this.delta);
    // this.el.setAttribute("position", `0 0 ${this.delta}`);
  },
};
