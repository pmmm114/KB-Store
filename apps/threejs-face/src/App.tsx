import { Canvas } from '@react-three/fiber';
import Museum from '@/canvas/Museum';

function App() {
  return (
    <div
      style={{
        height: '500px',
      }}
    >
      <Canvas>
        <Museum />
      </Canvas>
    </div>
  );
}

export default App;
