import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function RotatingBox() {
  // useRef로 mesh를 선택
  const ref = useRef<Mesh>(null);

  // 매 프레임마다 실행되는 훅
  useFrame((state, delta) => {
    // ref.current가 실제 THREE.Mesh 객체
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <div
      style={{
        height: '500px',
      }}
    >
      <Canvas>
        {/* 조명(예: AmbientLight, DirectionalLight 등) */}
        <directionalLight position={[1, 1, 1]} />

        {/* 3D 오브젝트(메쉬) */}
        {/* <Box /> */}
        <RotatingBox />
      </Canvas>
    </div>
  );
}

export default App;
