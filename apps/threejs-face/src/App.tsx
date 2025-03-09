import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import SceneOutside from '@/components/scenes/Outside';
import Player from '@/components/objects/Player/Player';

import '@/styles/_globals.css';
import { Suspense } from 'react';

const playerName = 'mainPlayer';

const INITIAL_PLAYER_SIZE = [() => 0.5, () => 0.9, () => 8, () => 16] as const;
const INITIAL_PLAYER_POSITION = [
  0,
  (INITIAL_PLAYER_SIZE[0]() * 2 + INITIAL_PLAYER_SIZE[1]()) / 2,
  10,
] as const;

function App() {
  return (
    <div className="canvas_wrap">
      <Canvas shadows>
        <Suspense>
          <Physics interpolate={false} colliders={'cuboid'} debug>
            <gridHelper args={[100, 100]} />
            <Player
              playerRidgidBodyProps={{
                name: playerName,
                mass: 1,
                position: INITIAL_PLAYER_POSITION,
                type: 'dynamic',
              }}
              playerMeshProps={{
                args: [0.5, 0.9, 8, 16],
              }}
              playerMovementProps={{
                speed: 25.0,
              }}
            />
            <SceneOutside />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
