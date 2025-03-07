import { useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import old_door_gltf from '@/assets/door/outside/scene.gltf';

const Door = () => {
  const { scene } = useGLTF(old_door_gltf);

  // INFO: 하위 Mesh에 Shadow 옵션 추가
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      castShadow
      rotation={[0, Math.PI / 2, 0]}
      scale={[3, 3, 3]}
    />
  );
};

export default Door;
