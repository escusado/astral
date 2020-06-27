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
    this.el.addEventListener("collidestart", this.handleCollision.bind(this));
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

      if (this.lastCubeColided && this.lastCubeColided.getAttribute("conway")) {
        const cubeId = this.lastCubeColided.getAttribute("conway").id;
        this.conwaySystem.punchLifeIntoExistance(cubeId);
      }
    }
  },

  handleCollision: function (e) {
    this.lastCubeColided = e.detail.targetEl;
  },
};
