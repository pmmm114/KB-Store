import { useRef, ComponentProps } from 'react';
import * as THREE from 'three';
import { PointerLockControls, PerspectiveCamera } from '@react-three/drei';
import type { RapierRigidBody } from '@react-three/rapier';
import type { ThreeElements } from '@react-three/fiber';

// INFO: Hooks
import usePlayerMovement from '@/hooks/usePlayerMovement';

// INFO: physics
import RigidBody from '@/components/physics/RigidBody/RigidBody';

interface IPlayerProps {
  playerRidgidBodyProps?: ComponentProps<typeof RigidBody>;
  playerMeshProps: ThreeElements['capsuleGeometry'];
  playerMovementProps?: Pick<ComponentProps<typeof usePlayerMovement>, 'speed'>;
}
const Player = ({
  playerRidgidBodyProps,
  playerMeshProps,
  playerMovementProps,
}: IPlayerProps) => {
  const perspectiveRef = useRef<THREE.Object3D | null>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  // INFO: Player Movement hook
  usePlayerMovement({
    cameraRef: perspectiveRef,
    rigidBodyRef: rigidBodyRef,
    playerMeshProps,
    speed: playerMovementProps?.speed || 10.0,
  });

  return (
    <>
      <PointerLockControls
        onLock={() => console.log('Pointer locked')}
        onUnlock={() => console.log('Pointer unlocked')}
      />
      <RigidBody
        ref={rigidBodyRef}
        type="dynamic"
        linearDamping={5}
        colliders="hull"
        name="player"
        lockRotations
        {...playerRidgidBodyProps}
      >
        <mesh>
          <capsuleGeometry attach="geometry" {...playerMeshProps} />
        </mesh>
      </RigidBody>
      <group ref={perspectiveRef}>
        <PerspectiveCamera
          makeDefault
          fov={45}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        />
      </group>
    </>
  );
};

export default Player;
