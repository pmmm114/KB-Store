import { useEffect, useRef, useState } from 'react';
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
  const scene = useThree((state) => state.scene);
  const set = useThree((state) => state.set);

  const [selected, setSelected] = useState<
    Array<THREE.Object3D<THREE.Object3DEventMap>>
  >([]);
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    if (!raycasterRef.current) return;

    raycasterRef.current.far = distance;
    set({
      raycaster: raycasterRef.current,
    });
  }, [distance]);

  useFrame(() => {
    if (!cameraRef.current) return;

    // INFO: 화면 중앙 (x=0, y=0) 기준으로 Ray 발사
    raycasterRef.current.setFromCamera(
      new THREE.Vector2(0, 0),
      cameraRef.current,
    );

    // INFO: 씬의 모든 자식과 교차 검사
    const [hit] = raycasterRef.current.intersectObjects(scene.children, true);
    // CONDITION: 교차점이 없으면 선택 해제
    if (!hit) {
      setSelected([]);
      return;
    }

    // INFO: 교차점이 있으면 선택하여 raycastable요소 탐색
    const raycastableObject = getRaycastableObject(hit.object);
    setSelected(raycastableObject ? [raycastableObject] : []);
  });

  return { selected };
}

export default useRaycastSelection;
