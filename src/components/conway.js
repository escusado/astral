export default {
  name: "conway",

  schema: {
    id: { type: "vec3" },
  },

  tick: function (time, timeDelta) {
    const decreaseDelta = timeDelta / 1000 - Math.random() / 1000;
    const alive = this.system.amIAlive(this.data.id);
    let y = this.el.components.position.data.y - decreaseDelta;
    const x = this.el.components.position.data.x;
    const z = this.el.components.position.data.z;

    this.el.setAttribute("color", alive ? "#2a9d8f" : "#e76f51");

    if (alive) {
      this.el.setAttribute("opacity", 1);
      y = 1;
    } else {
      const currentOpacity =
        parseFloat(this.el.components.material.attrValue.opacity) -
        decreaseDelta;
      // this.el.setAttribute("opacity", currentOpacity);
    }
    // this.el.setAttribute("position", { x, y, z });
  },
};
