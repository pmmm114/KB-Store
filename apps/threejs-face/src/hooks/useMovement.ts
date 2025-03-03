import { useEffect, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface IUseMovementProps {
  /** 이동 속도 (단위: m/s) */
  speed: number;
}
function useMovement({ speed = 3.0 }: IUseMovementProps) {
  const { camera } = useThree();

  // 키보드 상태
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  // 이벤트 리스너 등록
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(true);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(true);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(true);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(true);
          break;
        default:
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(false);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(false);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(false);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  /**
   * INFO: 매 프레임마다 이동 처리
   *  - 60fps일 때 매 프레임 delta ≈ 0.0167, 30fps일 때 delta ≈ 0.0333
   */
  useFrame((_, delta) => {
    // INFO: 1) 방향 벡터 초기화
    const direction = new THREE.Vector3();

    // INFO: 2) 앞뒤좌우 움직임 계산
    if (moveForward) direction.z -= 1;
    if (moveBackward) direction.z += 1;
    if (moveLeft) direction.x -= 1;
    if (moveRight) direction.x += 1;

    // INFO: 3) 실제 이동에 사용할 moveVector 생성 (y=0 고정)
    const moveVector = new THREE.Vector3(direction.x, 0, direction.z);

    /**
     * INFO: Vector를 오일러 회전만큼 회전
     *
     *  - 카메라가 회전한 만큼 방향 벡터(moveVector)도 회전
     */
    // INFO: 4) 카메라 회전에 따라 moveVector를 회전
    moveVector.applyEuler(camera.rotation);
    /**
     * INFO: 카메라 위치 업데이트
     * THREE.Vector3: https://threejs.org/docs/#api/en/math/Vector3.addScaledVector
     *
     *  - camera.position: THREE.Vector3 타입
     *  - addScaledVector: Adds the multiple of v and s to this vector.
     *
     */
    // INFO: 5) y축 카메라 움직임 제한
    moveVector.y = 0;

    // INFO: 6) 카메라 위치 업데이트 (시간보정: delta)
    camera.position.addScaledVector(moveVector, speed * delta);
  });

  return null;
}

export default useMovement;
