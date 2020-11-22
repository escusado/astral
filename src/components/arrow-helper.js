export default {
  name: "arrow-helper",

  schema: {
    entityId: { type: "string" },
  },

  init: function () {
    this.entityEl = document.getElementById(this.data.entityId);
    this.color = 0xffff00;
    this.arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1,
      this.color
    );
    this.el.sceneEl.object3D.add(this.arrowHelper);
  },

  tick: function (time, timeDelta) {
    // console.log('>>>>',this.entityEl.getAttribute('position') )
    const v1 = this.el.getAttribute("position");
    // console.log('>>>1', v1);
    const v2 = this.entityEl.getAttribute("position");

    var dir = new THREE.Vector3(); // create once an reuse it
    dir.subVectors(v2, v1).normalize();
    // console.log('>><<', dir)

    const length = v1.distanceTo(v2);

    this.el.sceneEl.object3D.remove(this.arrowHelper);
    this.arrowHelper = new THREE.ArrowHelper(dir, v1, length, this.color);
    this.el.sceneEl.object3D.add(this.arrowHelper);
  },
};
