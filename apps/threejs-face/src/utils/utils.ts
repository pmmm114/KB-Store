import * as THREE from 'three';

export const getRaycastableObject = (object: THREE.Object3D) => {
  let current = object;
  while (current.parent && current.parent.type !== 'Scene') {
    if (current.userData.raycastable) {
      break;
    }
    current = current.parent;
  }
  return current;
};
