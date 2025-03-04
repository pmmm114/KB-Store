import { Canvas } from '@react-three/fiber';

import SceneOutside from '@/components/scenes/Outside';
import Museum from '@/canvas/Museum';
import Iam from '@/components/environment/Cameras/Iam/Iam';

import '@/styles/_globals.css';

function App() {
  return (
    <div className="canvas_wrap">
      <Canvas shadows>
        <gridHelper args={[100, 100]} />
        <Iam />
        <SceneOutside />
        <Museum />
      </Canvas>
    </div>
  );
}

export default App;
