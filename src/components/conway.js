export default {
  name: "conway",

  schema: {
    id: { type: "vec3" },
  },

  tick: function (time, timeDelta) {
    const alive = this.system.amIAlive(this.data.id);

    this.el.setAttribute("color", alive ? "#2a9d8f" : "#e76f51");

    if (alive) {
      this.el.setAttribute("opacity", 1);
    } else {
      const currentOpacity =
        parseFloat(this.el.components.material.attrValue.opacity) -
        timeDelta / 1000;
      this.el.setAttribute("opacity", currentOpacity);
    }
  },
};
