let mouse = { x: 0, y: 0 };

export default {
  name: "mouse-follower",

  init: function () {
    this.currentIntersectionPosition = { x: 0, y: 0, z: 0 };

    document.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  },

  setIntersectionPosition: function (position) {
    this.currentIntersectionPosition = position;
  },

  onMouseMove: function (ev) {
    const camera = document.querySelector("#camera").object3D.children[0];
    const scene = document.querySelector("#camera").sceneEl.object3D;
    if (camera && ev && scene) {
      var raycaster = new THREE.Raycaster();
      var direction = new THREE.Vector3(0, 0, -1);
      var rotation = new THREE.Euler(0, 0, 0, "YXZ");

      //1. sets the mouse position with a coordinate system where the center
      //   of the screen is the origin
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      //2. set the picking ray from the camera position and mouse coordinates
      raycaster.setFromCamera(mouse, camera);

      //3. compute intersections
      var intersects = raycaster.intersectObjects(scene.children, true);

      for (var i = 0; i < intersects.length; i++) {
        console.log(intersects[i]);
        this.setIntersectionPosition(intersects[i].point);
        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
      }

      // let cameraPosition = new THREE.Vector3();
      // camera.getWorldPosition(cameraPosition);

      // // Update the mouse variable
      // ev.preventDefault();
      // mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      // mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      // // Make the sphere follow the mouse
      // var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

      // vector.unproject(camera);

      // var dir = vector.sub(cameraPosition).normalize();
      // var distance = -cameraPosition.z / dir.z;
      // var pos = cameraPosition.clone().add(dir.multiplyScalar(distance));
      // this.system.setIntersectionPosition(pos);
    }
  },

  getIntersectionPosition: function () {
    return this.currentIntersectionPosition;
  },
};
