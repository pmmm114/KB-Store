import { useRef } from 'react';
import * as THREE from 'three';

import { useHelper, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Objects
import Card from '@/components/objects/Card/Card';

// Environment
import Wall from '@/components/environment/Walls/Wall';
import Floor from '@/components/environment/Floors/Floor';

// Hooks
import useMovement from '@/hooks/useMovement';

// Assets
import project_wallet_images from '@/assets/images/project_wallet.webp';

import paving_stones_color_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Color.jpg';
import paving_stones_ao_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_AmbientOcclusion.jpg';
import paving_stones_displacement_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Displacement.jpg';
import paving_stones_normal_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_NormalGL.jpg';
import paving_stones_roughness_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Roughness.jpg';

const SIZE = {
  WALL: {
    X: () => 30,
    Y: () => 6,
    Z: () => 0.3,
  },
  FLOOR: {
    X: () => 100,
    Y: () => 100,
  },
};

function Museum() {
  const directionalLight = useRef<THREE.DirectionalLight>(null!);
  const shadowCamera = useRef<THREE.OrthographicCamera>(null!);
  useHelper(directionalLight, THREE.DirectionalLightHelper);
  useHelper(shadowCamera, THREE.CameraHelper);

  const floorTexturesMaps = useTexture({
    map: paving_stones_color_image,
    displacementMap: paving_stones_displacement_image,
    normalMap: paving_stones_normal_image,
    roughnessMap: paving_stones_roughness_image,
    aoMap: paving_stones_ao_image,
  });
  // INFO: 텍스처 반복 설정
  Object.values(floorTexturesMaps).forEach((tex: THREE.Texture) => {
    if (!tex) return;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(30, 15); // 반복 횟수 (원하는 대로 조절)
  });

  const wall_refs = useRef<THREE.Mesh[]>([]);
  const floor_refs = useRef<THREE.Mesh[]>([]);
  const card_refs = useRef<THREE.Mesh>(null);

  // INFO: 이동 훅
  useMovement({ speed: 5.0 });
  // 매 프레임마다 실행되는 훅

  useFrame((state, delta) => {
    // ref.current가 실제 THREE.Mesh 객체
    if (card_refs.current) {
      card_refs.current.rotation.y += delta;
    }
  });

  return (
    <>
      {/* 조명 */}
      <directionalLight
        ref={directionalLight}
        position={[40, 50, 20]}
        castShadow
        intensity={4}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          ref={shadowCamera}
          attach="shadow-camera"
          args={[-20, 20, 20, -20]}
          near={1}
          far={500}
        />
      </directionalLight>
      {/* 자연광 */}
      <ambientLight color="white" intensity={0.3} />
      {/* 반사광 */}
      <hemisphereLight args={[0x87ceeb, 0x444444]} intensity={0.3} />

      <Wall
        rootMeshProps={{
          ref: wall_refs,
          position: [6, SIZE.WALL.Y() / 2, 0],
          rotation: [0, Math.PI / 2, 0],
          castShadow: true,
        }}
        boxGeometryProps={{
          args: [SIZE.WALL.X(), SIZE.WALL.Y(), SIZE.WALL.Z()],
        }}
      >
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </Wall>
      <Wall
        rootMeshProps={{
          ref: wall_refs,
          position: [-6, SIZE.WALL.Y() / 2, 0],
          rotation: [0, Math.PI / 2, 0],
          castShadow: true,
          receiveShadow: true,
        }}
        boxGeometryProps={{
          args: [SIZE.WALL.X(), SIZE.WALL.Y(), SIZE.WALL.Z()],
        }}
      >
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </Wall>
      <Floor
        rootMeshProps={{
          ref: floor_refs,
          position: [0, 0, 0],
          rotation: [-Math.PI / 2, 0, 0],
          receiveShadow: true,
        }}
        planeGeometryProps={{
          args: [SIZE.FLOOR.X(), SIZE.FLOOR.Y(), 300, 150],
        }}
      >
        <meshStandardMaterial
          {...floorTexturesMaps}
          side={THREE.DoubleSide}
          displacementScale={0.1}
          normalScale={2}
          roughness={2}
        />
      </Floor>
      <Card
        rootMeshProps={{
          ref: card_refs,
          position: [0, 0, 0],
        }}
        boxGeometryProps={{ args: [0.104, 0.166, 0.0001] }}
        text="Hello"
        image={project_wallet_images}
      />
    </>
  );
}

export default Museum;
