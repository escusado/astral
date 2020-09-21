export default {
  name: "user-camera",

  init: function () {
    this.entities = [];
    this.camera;
    this.subject;
  },

  registerCamera: function (el) {
    this.camera = el;
  },

  registerSubject: function (el) {
    this.subject = el;
  },

  getSubject: function () {
    return this.subject;
  },

  // tick: function (time, timeDelta) {
  //   this.timeElapsed += timeDelta;
  //   if (this.timeElapsed < 2000) {
  //     return;
  //   }
  // },
};
