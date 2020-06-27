export default {
  name: "conway-seed",

  // schema: {
  //   speed: { type: "number" },
  // },

  init: function () {
    this.conwaySystem = document.querySelector("a-scene").systems["conway"];
    this.originScale = 1;
    this.targetScale = 2;
    this.scale = this.originScale;
    var playerEl = document.querySelector("[camera]");
    console.log(">>>>>playerEl ", playerEl);
    // playerEl.removeEventListener("collide", this.handleCollision.bind(this));
    playerEl.addEventListener("collidestart", this.handleCollision.bind(this));
  },

  tick: function (time, timeDelta) {
    this.scale += timeDelta / 5000;
    this.el.setAttribute("scale", `${this.scale} ${this.scale} ${this.scale}`);
    let currentColorIndex = Math.round(
      (this.conwaySystem.colorScale.length /
        (this.targetScale - this.originScale)) *
        (this.scale - this.originScale)
    );
    this.el.setAttribute(
      "color",
      this.conwaySystem.colorScale[currentColorIndex] ||
        this.conwaySystem.colorScale[this.conwaySystem.colorScale.length - 1]
    );

    if (this.scale >= this.targetScale) {
      this.scale = 1;
      console.log(AFRAME.scenes[0].systems.physics.driver.collisions);
    }
  },

  handleCollision: function (e) {
    console.log("Player has collided with body #" + e.detail.body.id);

    e.detail.target.el; // Original entity (playerEl).
    e.detail.body.el; // Other entity, which playerEl touched.
    e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
    e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
  },
};
