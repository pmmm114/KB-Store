import * as THREE from 'three';

export const getRaycastableObject = (object: THREE.Object3D) => {
  let _object = object;
  let raycastable = null;

  while (_object.parent && _object.parent.type !== 'Scene') {
    if (_object.parent.userData.raycastable) {
      raycastable = _object.parent;
      break;
    }

    _object = _object.parent;
  }
  return raycastable;
};
