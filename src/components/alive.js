export default {
  name: "alive",

  schema: {
    x: { type: "number" },
    y: { type: "number" },
  },

  init: function () {
    // this.el.addEventListener("generation", (ev) => {
    //   console.log("me:", this.data.x, this.data.y);
    // });
  },

  tick: function (time, timeDelta) {
    // this.el.setAttribute("color", this.data.living ? "#F00" : "#0F0");
  },
};
