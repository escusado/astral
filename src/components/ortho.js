// <a-scene ortho>

export default {
  init: function () {
    var sceneEl = this.el.sceneEl;
    sceneEl.addEventListener("loaded", () => {
      this.originalCamera = sceneEl.camera;
      this.cameraParent = sceneEl.camera.parent;

      var aspect = window.innerWidth / window.innerHeight;
      var d = 10;

      this.orthoCamera = new THREE.OrthographicCamera(
        -d * aspect,
        d * aspect,
        d,
        -d,
        1,
        1000
      );
      this.cameraParent.add(this.orthoCamera);
      this.orthoCamera.position.set(0, d, 0); // all components equal
      this.orthoCamera.lookAt(0, 0, 0); // or the origin
      sceneEl.camera = this.orthoCamera;
    });
  },
  remove: function () {
    this.cameraParent.remove(this.orthoCamera);
    sceneEl.camera = this.originalCamera;
  },
};
