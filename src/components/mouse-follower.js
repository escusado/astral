var mouse = { x: 0, y: 0 };

export default {
  name: "mouse-follower",

  schema: {
    follower: { type: "boolean" },
  },

  init: function () {
    console.log(">>> this interecting");

    if (!this.data.follower) {
      document.addEventListener(
        "mousemove",
        this.onMouseMove.bind(this),
        false
      );
    }
  },

  onMouseMove: function (ev) {
    const camera = document.querySelector("#camera").object3D.children[0];
    if (camera && ev) {
      let cameraPosition = new THREE.Vector3();
      camera.getWorldPosition(cameraPosition);

      // Update the mouse variable
      ev.preventDefault();
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      // Make the sphere follow the mouse
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

      vector.unproject(camera);

      var dir = vector.sub(cameraPosition).normalize();
      var distance = -cameraPosition.z / dir.z;
      var pos = cameraPosition.clone().add(dir.multiplyScalar(distance));
      this.system.setIntersectionPosition(pos);
    }
  },

  tick: function (time, timeDelta) {
    // const currentRotation = this.el.object3D.rotation;
    // this.delta += (timeDelta / 10) * this.data.speed;
    // this.el.setAttribute("rotation", `0 ${this.delta} 0`);
    if (this.data.follower) {
      console.log("readfromsystem", this.system.getIntersectionPosition());
      this.el.setAttribute("position", this.system.getIntersectionPosition());
    }
  },
};
