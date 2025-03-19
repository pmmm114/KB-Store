import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

// INFO: utils
import { getRaycastableObject } from '@/utils/utils';

interface IUseRaycastSelectionProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  distance?: number;
}
function useRaycastSelection({
  cameraRef,
  distance = 5,
}: IUseRaycastSelectionProps) {
  const { scene } = useThree();
  const [selected, setSelected] = useState<
    Array<THREE.Object3D<THREE.Object3DEventMap>>
  >([]);
  const raycasterRef = useRef(new THREE.Raycaster());

  useFrame(() => {
    if (!cameraRef.current) return;

    // INFO: 화면 중앙 (x=0, y=0) 기준으로 Ray 발사
    raycasterRef.current.setFromCamera(
      new THREE.Vector2(0, 0),
      cameraRef.current,
    );

    // 씬의 모든 자식과 교차 검사
    const intersects = raycasterRef.current.intersectObjects(
      scene.children,
      true,
    );
    if (intersects.length <= 0) {
      setSelected([]);
      return;
    }
    // 가장 가까운 물체만 선택
    const [hit] = intersects;
    if (hit.distance < distance) {
      const raycastableObject = getRaycastableObject(hit.object);
      setSelected([raycastableObject]);
    } else {
      setSelected([]);
    }
  });

  return { selected };
}

export default useRaycastSelection;
