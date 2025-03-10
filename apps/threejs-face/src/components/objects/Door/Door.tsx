import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type RapierRigidBody, quat } from '@react-three/rapier';

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

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // INFO: 문 열기
  const doorClickHandler = () => {
    // CONDITION: 애니메이션 진행 중이면 중단
    if (isAnimating === true) return;

    // CONDITION: 문 프레임이 없으면 중단
    if (!leftDoorRef.current || !rightDoorRef.current || !doorFrameRef.current)
      return;

    // INFO: 애니메이션 진행 시작 플래그 설정
    setIsAnimating(true);

    /**
     * INFO: 애니메이션 지속 시간 (s)
     */
    const duration = 3;

    /**
     * 1) 현재(시작) 쿼터니언
     */
    const currentAngleQuatOfLeftDoor = quat(leftDoorRef.current.rotation());
    const currentAngleQuatOfRightDoor = quat(rightDoorRef.current.rotation());
    console.log(currentAngleQuatOfLeftDoor, currentAngleQuatOfRightDoor);

    /**
     * 2) 목표 쿼터니언 계산
     *
     * 목표 쿼터니언은 현재 쿼터니언과 목표 쿼터니언을 곱하여 얻음
     * 목표 쿼터니언은 회전 축과 회전 각도를 포함한 쿼터니언
     */
    const axisY = new THREE.Vector3(0, 1, 0);
    const angleValue = Math.PI / 2;
    const targetQuatOfLeftDoor = quat().multiplyQuaternions(
      currentAngleQuatOfLeftDoor,
      quat().setFromAxisAngle(axisY, isOpen ? angleValue : -angleValue),
    );
    const targetQuatOfRightDoor = quat().multiplyQuaternions(
      currentAngleQuatOfRightDoor,
      quat().setFromAxisAngle(axisY, isOpen ? -angleValue : angleValue),
    );

    // 4) 매 프레임 보간 결과를 넣을 임시 쿼터니언(재사용)
    const nextLeftQuat = quat();
    const nextRightQuat = quat();

    /**
     * 3) 애니메이션 적용
     */
    gsap.to(
      { t: 0 },
      {
        t: 1,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: function () {
          const progress = this.targets()[0].t;

          /**
           * 4) 현재 쿼터니언과 목표 쿼터니언을 보간하여 다음 쿼터니언을 계산
           */
          nextLeftQuat.slerpQuaternions(
            currentAngleQuatOfLeftDoor,
            targetQuatOfLeftDoor,
            progress,
          );

          nextRightQuat.slerpQuaternions(
            currentAngleQuatOfRightDoor,
            targetQuatOfRightDoor,
            progress,
          );

          /**
           * 5) 쿼터니언을 설정
           */
          leftDoorRef.current?.setNextKinematicRotation(nextLeftQuat);
          rightDoorRef.current?.setNextKinematicRotation(nextRightQuat);
        },
        onComplete: function () {
          console.log('Complete Door Animation');
          setIsAnimating(false);
          setIsOpen((prev) => !prev);
        },
      },
    );
  };

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
    <group
      castShadow
      scale={[3, 3, 3]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={(e) => {
        // INFO: 이벤트 전파 방지
        e.stopPropagation();
        doorClickHandler();
      }}
    >
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
  );
};

export default Door;
