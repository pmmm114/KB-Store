import { useRef } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';

const Outside = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null!);
  const shadowCamera = useRef<THREE.OrthographicCamera>(null!);
  useHelper(directionalLight, THREE.DirectionalLightHelper);
  useHelper(shadowCamera, THREE.CameraHelper);
  return (
    <>
      {/* 조명 */}
      <directionalLight
        ref={directionalLight}
        position={[40, 50, 20]}
        castShadow
        intensity={4}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          ref={shadowCamera}
          attach="shadow-camera"
          args={[-20, 20, 20, -20]}
          near={1}
          far={500}
        />
      </directionalLight>
    </>
  );
};

export default Outside;
