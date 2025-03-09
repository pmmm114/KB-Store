import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type RapierRigidBody } from '@react-three/rapier';

import RigidBody from '@/components/physics/RigidBody/RigidBody';

import old_door_gltf from '@/assets/door/outside/scene.gltf';

import * as T from './types';

// INFO: 문 회전 축 위치
const DOOR_ROTATION_AXIS = {
  left: () => [-0.09, 0, -0.81],
  right: () => [-0.09, 0, 0.81],
} as const satisfies T.TDoorRotationAxisPosition;

const Door = () => {
  const { scene, nodes } = useGLTF(old_door_gltf);
  const doorFrameRef = useRef<RapierRigidBody>(null);
  const leftDoorRef = useRef<RapierRigidBody>(null);
  const rightDoorRef = useRef<RapierRigidBody>(null);

  useEffect(() => {
    // INFO: 하위 Mesh에 Shadow 옵션 추가
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      <group scale={[3, 3, 3]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <RigidBody ref={doorFrameRef} type="fixed" colliders="trimesh">
          <mesh
            geometry={nodes.Jamb_Door_0.geometry}
            material={nodes.Jamb_Door_0.material}
          />
        </RigidBody>
        <RigidBody
          ref={leftDoorRef}
          type="kinematicPosition"
          colliders="hull"
          position={DOOR_ROTATION_AXIS.left()}
          rotation={[0, 0, 0]}
        >
          <mesh
            position={
              DOOR_ROTATION_AXIS.left().map(
                (v) => -v,
              ) as T.TRigidBodyComponentPosition
            }
            geometry={nodes.Object_18.geometry}
            material={nodes.Object_18.material}
          />
        </RigidBody>
        <RigidBody
          ref={rightDoorRef}
          type="kinematicPosition"
          colliders="hull"
          position={DOOR_ROTATION_AXIS.right()}
        >
          <mesh
            position={
              DOOR_ROTATION_AXIS.right().map(
                (v) => -v,
              ) as T.TRigidBodyComponentPosition
            }
            geometry={nodes.Object_16.geometry}
            material={nodes.Object_16.material}
          />
        </RigidBody>
      </group>
    </>
  );
};

export default Door;
