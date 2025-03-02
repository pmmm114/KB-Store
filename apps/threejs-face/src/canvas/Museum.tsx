import { useRef } from 'react';
import { Mesh } from 'three';

import { useFrame } from '@react-three/fiber';
import Card from '@/components/Card/Card';

import project_wallet_images from '@/assets/images/project_wallet.webp';

function Museum() {
  const card_refs = useRef<Mesh>(null);

  // 매 프레임마다 실행되는 훅
  useFrame((state, delta) => {
    // ref.current가 실제 THREE.Mesh 객체
    if (card_refs.current) {
      card_refs.current.rotation.y += delta;
    }
  });

  return (
    <>
      {/* 조명(예: AmbientLight, DirectionalLight 등) */}
      <directionalLight position={[0, 1, 1]} />

      <Card
        rootMeshProps={{
          ref: card_refs,
          position: [0, 0, 0],
        }}
        boxGeometryProps={{ args: [2, 3, 0.01] }}
        text="Hello"
        image={project_wallet_images}
      />
    </>
  );
}

export default Museum;
