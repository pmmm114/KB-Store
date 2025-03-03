import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Objects
import Card from '@/components/objects/Card/Card';

// Environment
import Wall from '@/components/environment/Walls/Wall';

// Assets
import project_wallet_images from '@/assets/images/project_wallet.webp';

const SIZE = {
  WALL: {
    X: () => 30,
    Y: () => 6,
    Z: () => 0.3,
  },
};

function Museum() {
  const wall_refs = useRef<THREE.Mesh[]>([]);
  const card_refs = useRef<THREE.Mesh>(null);

  // 매 프레임마다 실행되는 훅
  useFrame((state, delta) => {
    // ref.current가 실제 THREE.Mesh 객체
    if (card_refs.current) {
      card_refs.current.rotation.y += delta;
    }
  });

  return (
    <>
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
