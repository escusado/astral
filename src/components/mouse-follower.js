export default {
  name: "mouse-follower",

  schema: {
    follower: { type: "boolean" },
  },

  tick: function (time, timeDelta) {
    if (this.data.follower) {
      console.log("readfromsystem", this.system.getIntersectionPosition());
      this.el.setAttribute("position", this.system.getIntersectionPosition());
    }
  },
};
