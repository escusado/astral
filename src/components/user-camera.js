export default {
  name: "user-camera",

  schema: {
    isCamera: { type: "boolean" },
    isCameraSubject: { type: "boolean" },
  },

  init: function () {
    if (this.data.isCamera) {
      this.system.registerCamera(this.el);
    } else {
      this.system.registerSubject(this.el);
    }
  },

  // tick: function (time, timeDelta) {
  //   if (this.isCameraSubject) return;

  //   const subject = this.system.getSubject();
  //   const subjectPosition = subject.getAttribute("position");
  //   const subjectQuaternion = subject.getObject3D("mesh").quaternion;
  //   const cameraPosition = this.get3rdPersonViewCameraPosition(subjectPosition);

  //   // this.el.setAttribute("position", cameraPosition);

  //   const startRotation = new THREE.Quaternion().setFromEuler(
  //     new THREE.Euler(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  //   );
  //   const endRotation = new THREE.Quaternion(subjectQuaternion);

  //   const t = THREE.Math.clamp(timeDelta, 0, 1);
  //   const resultQuaternion = new THREE.Quaternion();
  //   THREE.Quaternion.slerp(startRotation, endRotation, resultQuaternion, t);

  //   this.el.setAttribute(
  //     "rotation",
  //     new THREE.Euler().setFromQuaternion(resultQuaternion).toVector3()
  //   );
  // },

  get3rdPersonViewCameraPosition: function (subjectPosition) {
    return { x: subjectPosition.x - 2, y: 2, z: subjectPosition.z - 2 };
  },
};
