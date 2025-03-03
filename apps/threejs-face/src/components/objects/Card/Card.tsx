import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

interface ICardProps {
  /** 메시 컴포넌트 속성 */
  rootMeshProps: ThreeElements['mesh'];
  /** 박스 기하 속성 */
  boxGeometryProps: ThreeElements['boxGeometry'];
  /** 카드 텍스트 */
  text: string;
  /** 카드 이미지 */
  image: string;
}
const Card = ({ rootMeshProps, boxGeometryProps, text, image }: ICardProps) => {
  // INFO: 캔버스 기본 사이즈
  const CANVAS_SIZE = 512;
  // INFO: 캔버스에서 이미지영역 비율
  const IMAGE_ASPECT_RATIO = 0.5;
  // CanvasTexture를 저장해둘 Ref
  const frontTextureRef = useRef<THREE.CanvasTexture>(null);
  const CardRatio = useMemo(() => {
    if (
      boxGeometryProps &&
      Array.isArray(boxGeometryProps.args) &&
      boxGeometryProps.args[0] &&
      boxGeometryProps.args[1]
    ) {
      return boxGeometryProps.args[0] / boxGeometryProps.args[1];
    }

    return 1;
  }, [boxGeometryProps]);

  // 첫 렌더 시 CanvasTexture 생성
  if (!frontTextureRef.current) {
    // 빈 canvas를 만들어 Texture 생성
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE / CardRatio;
    frontTextureRef.current = new THREE.CanvasTexture(canvas);
  }

  // text가 변경될 때마다 그림 다시 그리기
  useEffect(() => {
    const texture = frontTextureRef.current;
    if (!texture) return;

    const imageElement = new Image();
    imageElement.src = image;

    // INFO: 캔버스와 원본의 비율차이
    const DifferenceRatioBetweenCanvasAndOriginal =
      imageElement.width / texture.image.width;

    const canvas = texture.image;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    imageElement.onload = () => {
      const ratioMaintenanceImageWidth =
        imageElement.width / DifferenceRatioBetweenCanvasAndOriginal;
      const ratioMaintenanceImageHeight =
        imageElement.height / DifferenceRatioBetweenCanvasAndOriginal;
      ctx.drawImage(
        imageElement,
        0,
        0,
        ratioMaintenanceImageWidth,
        ratioMaintenanceImageHeight,
      );

      texture.needsUpdate = true;
    };

    ctx.fillStyle = 'white';
    ctx.font = '14px sans-serif';
    ctx.fillText(text, 50, 400);

    // 텍스처 업데이트
    texture.needsUpdate = true;
  }, [text]);

  /**
   * BoxGeometry의 6개 면에 대한 머티리얼 설정을 배열로 관리합니다.
   *  - 인덱스 순서: [0:+X, 1:-X, 2:+Y, 3:-Y, 4:+Z(앞면), 5:-Z(뒷면)]
   */
  const materials = useMemo(() => {
    const frontMaterial = {
      map: frontTextureRef.current,
      color: 'lightgray',
      metalness: 0,
      roughness: 0.5,
    };
    const defaultMaterial = {
      color: 'lightgray',
      metalness: 0,
      roughness: 0.5,
    };

    return [
      defaultMaterial, // +X
      defaultMaterial, // -X
      defaultMaterial, // +Y
      defaultMaterial, // -Y
      frontMaterial, // +Z (앞면)
      defaultMaterial, // -Z (뒷면)
    ];
  }, [frontTextureRef]);

  return (
    <mesh {...rootMeshProps}>
      <boxGeometry {...boxGeometryProps} attach="geometry" />
      {materials.map((material, index) => (
        <meshStandardMaterial
          key={index}
          {...material}
          attach={`material-${index}`}
        />
      ))}
    </mesh>
  );
};

export default Card;
