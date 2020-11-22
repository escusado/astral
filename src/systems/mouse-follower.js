export default {
  name: "mouse-follower",

  init: function () {
    this.camera = null;
    this.mouse = { x: 0, y: 0 };
    this.raycaster = new THREE.Raycaster();

    this.currentIntersectionPosition = { x: 0, y: 0, z: 0 };
    document.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  },

  onMouseMove: function (ev) {
    const cameraEl = document.querySelector("#camera");
    const tilesEl = [...document.querySelectorAll(".terrain-tile")];

    if(tilesEl.length < 1) {
      return
    }
    
    
    const tilesObjects = tilesEl.map(tileEl => tileEl.object3D)
    const scene = cameraEl.sceneEl.object3D;

    if (this.camera && ev) {
      this.mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      let intersects = this.raycaster.intersectObjects(tilesObjects, true);
      for (let i = 0; i < intersects.length; i++) {
        this.currentIntersectionPosition = intersects[i].point;
      }
    }

    if (cameraEl && scene) {
      const camera = cameraEl.object3D.children[0];
      this.camera = camera;
    }
  },

  getIntersectionPosition: function () {
    return this.currentIntersectionPosition;
  },
};
