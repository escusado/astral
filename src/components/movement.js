const PITCH = { w: -1, s: 1 };
const ROLL = { a: -1, d: 1 };

export default {
  name: "movement",

  init: function () {
    this.key = "";

    window.addEventListener(
      "keydown",
      (event) => {
        const key = event.key.toLowerCase();

        if ("wasd ".indexOf(key) > -1) {
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
      let jump = 0;
      if (this.key === " ") {
        jump = 3;
      }
      this.el.body.setLinearVelocity(
        new Ammo.btVector3(ROLL[this.key] || 0, jump, PITCH[this.key] || 0)
      );
    }
  },
};
