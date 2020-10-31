export default {
  name: "mouse-follower",

  tick: function () {
    this.el.setAttribute("position", this.system.getIntersectionPosition());
  },
};
