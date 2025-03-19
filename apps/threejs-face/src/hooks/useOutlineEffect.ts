import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, RenderPass, OutlinePass } from 'three/addons';

interface IUseOutlineEffectProps {
  camera: THREE.PerspectiveCamera | null;
  activedObject: Array<THREE.Object3D<THREE.Object3DEventMap>>;
}
function useOutlineEffect({ camera, activedObject }: IUseOutlineEffectProps) {
  const scene = useThree((state) => state.scene);
  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);

  const composer = useRef<EffectComposer | null>(null);
  const outlinePass = useRef<OutlinePass | null>(null);

  useEffect(() => {
    if (!camera) return;

    // EffectComposer 및 OutlinePass 초기화
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));
    outlinePass.current = new OutlinePass(
      new THREE.Vector2(size.width, size.height),
      scene,
      camera,
    );
    // OutlinePass 설정: 흰색 테두리, 두께/강도 조절
    outlinePass.current.edgeStrength = 5; // 테두리 두께
    outlinePass.current.edgeThickness = 5; // 테두리 두께
    outlinePass.current.edgeGlow = 0.5; // 테두리 반짝임
    outlinePass.current.visibleEdgeColor.set('#FF0000'); // 보이는 윤곽선 색
    outlinePass.current.hiddenEdgeColor.set('#ffffff'); // 가려진 부분 윤곽선 색
    composer.current.addPass(outlinePass.current);

    // 창 크기 변화에 대비해 사이즈 업데이트 (선택 사항)
    composer.current.setSize(size.width, size.height);
  }, [scene, camera, gl, size]);

  // hoveredObject가 변경될 때 Outline 대상 업데이트
  useEffect(() => {
    if (!composer.current || !outlinePass.current) return;
    if (activedObject) {
      outlinePass.current.selectedObjects = [...activedObject];
    } else {
      outlinePass.current.selectedObjects = []; // 대상 없으면 윤곽 대상 초기화
    }
  }, [activedObject]);

  // 매 프레임마다 EffectComposer로 렌더링
  useFrame(({ gl }) => {
    if (!composer.current) return;

    gl.autoClear = false;
    gl.clear();
    composer.current?.render();
  }, 2);
}

export default useOutlineEffect;
