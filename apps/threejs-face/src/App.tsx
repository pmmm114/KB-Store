import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';

import Outside from '@/components/environment/Lights/Outside/Outside';
import Museum from '@/canvas/Museum';
import Iam from '@/components/environment/Cameras/Iam/Iam';

import '@/styles/_globals.css';

function App() {
  return (
    <div className="canvas_wrap">
      <Canvas shadows>
        <gridHelper args={[100, 100]} />
        <Iam />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <Outside />
        <Museum />
      </Canvas>
    </div>
  );
}

export default App;
