import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RapierRigidBody } from '@react-three/rapier';
import { useFrame, ThreeElements } from '@react-three/fiber';
interface IUsePlayerMovementProps {
  /** 카메라 인스턴스 */
  cameraRef: React.RefObject<THREE.Object3D | null>;
  /** 물리 인스턴스 */
  rigidBodyRef?: React.RefObject<RapierRigidBody | null>;
  /** 이동 속도 (단위: m/s) */
  speed: number;
  /** 플레이어 메시 속성 */
  playerMeshProps: ThreeElements['capsuleGeometry'];
}
interface IMoveKeys {
  KeyW: boolean;
  KeyS: boolean;
  KeyA: boolean;
  KeyD: boolean;
}
function usePlayerMovement({
  cameraRef,
  rigidBodyRef,
  speed = 3.0,
  playerMeshProps,
}: IUsePlayerMovementProps) {
  // INFO: 키 입력 상태
  const keys = useRef<IMoveKeys>({
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
  });

  // INFO: 카메라 y 위치 계산
  const sightHeight = useMemo(() => {
    const [radius, height] = playerMeshProps?.args ?? [0, 0, 0, 0];
    if (!radius || !height) return 0;

    return (radius * 2 + height) * 0.9;
  }, [playerMeshProps]);

  // 이벤트 리스너 등록
  useEffect(() => {
    if (!cameraRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (Object.hasOwn(keys.current, e.code)) {
        keys.current[e.code as keyof IMoveKeys] = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (Object.hasOwn(keys.current, e.code)) {
        keys.current[e.code as keyof IMoveKeys] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [cameraRef]);

  /**
   * INFO: 매 프레임마다 이동 처리
   *  - 60fps일 때 매 프레임 delta ≈ 0.0167, 30fps일 때 delta ≈ 0.0333
   */
  useFrame((_, delta) => {
    if (!cameraRef.current || !rigidBodyRef?.current) return;

    // INFO: 플레이어 물리 인스턴스
    const playerRigidBody = rigidBodyRef.current;
    // INFO: 현재 RigidBody 위치
    const currentRigidBodyPos = playerRigidBody.translation();

    // INFO: 임펄스(충격) 벡터
    const impulse = new THREE.Vector3(0, 0, 0);
    // INFO: 이동 방향 계산 (간단 WASD)
    if (keys.current.KeyW) impulse.z -= speed * delta;
    if (keys.current.KeyS) impulse.z += speed * delta;
    if (keys.current.KeyA) impulse.x -= speed * delta;
    if (keys.current.KeyD) impulse.x += speed * delta;

    // INFO: rigidBody에 실제로 임펄스를 적용
    if (impulse.lengthSq() > 0) {
      playerRigidBody.applyImpulse(
        { x: impulse.x, y: impulse.y, z: impulse.z },
        true,
      );
    }

    // INFO: 카메라 위치 이동
    cameraRef.current.position.set(
      currentRigidBodyPos.x,
      sightHeight,
      currentRigidBodyPos.z,
    );
  });

  return null;
}

export default usePlayerMovement;
