import { useRef, ComponentProps } from 'react';
import * as THREE from 'three';
import { type ThreeElements } from '@react-three/fiber';
import { PointerLockControls, PerspectiveCamera, Box } from '@react-three/drei';
import type { RapierRigidBody } from '@react-three/rapier';

// INFO: Hooks
import usePlayerMovement from '@/hooks/usePlayerMovement';
import useRaycastSelection from '@/hooks/useRaycastSelector';
import useOutlineEffect from '@/hooks/useOutlineEffect';

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
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  // INFO: 레이캐스트 선택 훅
  const { selected } = useRaycastSelection({ cameraRef, distance: 5 });

  // INFO: 윤곽 효과 훅
  useOutlineEffect({ camera: cameraRef.current, activedObject: selected });

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
          ref={cameraRef}
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
