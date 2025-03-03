import { Canvas, CameraProps } from '@react-three/fiber';

import Museum from '@/canvas/Museum';
import { PointerLockControls } from '@react-three/drei';

import '@/styles/_globals.css';

const INITIAL_CAMERA_POSITION = [
  0, 1.6, 20,
] as const satisfies CameraProps['position'];

function App() {
  return (
    <div className="canvas_wrap">
      <Canvas
        shadows
        camera={{
          type: 'perspective',
          fov: 45,
          near: 1,
          far: 1000,
          position: INITIAL_CAMERA_POSITION,
        }}
      >
        <gridHelper args={[100, 100]} />
        <Museum />
        <PointerLockControls
          onLock={() => console.log('Pointer locked')}
          onUnlock={() => console.log('Pointer unlocked')}
        />
      </Canvas>
    </div>
  );
}

export default App;
