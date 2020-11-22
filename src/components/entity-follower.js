const PITCH = { w: -1, s: 1 };
const ROLL = { a: -1, d: 1 };

export default {
  name: "entity-follower",

  schema: {
    entityId: { type: "string" },
  },

  init: function () {
    this.entityEl = document.getElementById(this.data.entityId);
    this.dir = new THREE.Vector3();
  },

  tick: function (time, timeDelta) {
    const v1 = this.el.getAttribute("position");

    const v2 = this.entityEl.getAttribute("position");

    this.dir.subVectors(v2, v1).normalize();

    const length = 5 + v1.distanceTo(v2);
    console.log(">>>", length);
    if (this.el.body) {
      this.el.body.applyCentralForce(
        new Ammo.btVector3(length * this.dir.x, 0, length * this.dir.z)
      );
    }
  },
};
