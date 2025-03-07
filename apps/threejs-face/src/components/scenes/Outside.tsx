import { useRef } from 'react';
import * as THREE from 'three';
import { useHelper, useTexture, Environment } from '@react-three/drei';

// INFO: objects
import Door from '@/components/objects/Door/Door';

// INFO: environment
import OutsideLight from '@/components/environment/Lights/Outside/Outside';
import Floor from '@/components/environment/Floors/Floor';

// INFO: assets
import paving_stones_color_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Color.jpg';
import paving_stones_ao_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_AmbientOcclusion.jpg';
import paving_stones_displacement_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Displacement.jpg';
import paving_stones_normal_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_NormalGL.jpg';
import paving_stones_roughness_image from '@/assets/floor/pavingStone/PavingStones138_4K-JPG_Roughness.jpg';

import outside_environment_image from '@/assets/HDRi/Outside/kloofendal_48d_partly_cloudy_puresky_4k.exr';
const SIZE = {
  FLOOR: {
    X: () => 100,
    Y: () => 100,
  },
};

const SceneOutside = () => {
  const floor_refs = useRef<THREE.Mesh[]>([]);
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

  const directionalLight = useRef<THREE.DirectionalLight>(null!);
  const shadowCamera = useRef<THREE.OrthographicCamera>(null!);
  useHelper(directionalLight, THREE.DirectionalLightHelper);
  useHelper(shadowCamera, THREE.CameraHelper);
  return (
    <>
      <Environment files={[outside_environment_image]} background />
      <OutsideLight />
      <Door />
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
    </>
  );
};

export default SceneOutside;
