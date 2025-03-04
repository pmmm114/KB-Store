import * as THREE from 'three';
import { PointerLockControls, PerspectiveCamera } from '@react-three/drei';

// Hooks
import useIamMovement from '@/hooks/useIamMovement';
import { useRef } from 'react';

const INITIAL_CAMERA_POSITION = [0, 1.6, 40] as const;

const Iam = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  console.log('I am');
  // INFO: 카메라 이동 훅
  useIamMovement({ cameraRef: cameraRef, speed: 5.0 });

  return (
    <>
      <PointerLockControls
        onLock={() => console.log('Pointer locked')}
        onUnlock={() => console.log('Pointer unlocked')}
      />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={1}
        far={1000}
        position={INITIAL_CAMERA_POSITION}
      />
    </>
  );
};

export default Iam;
