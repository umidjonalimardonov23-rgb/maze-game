import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { Suspense } from 'react';
import MazeWalls from './MazeWalls';
import Player from './Player';
import CollectibleItem from './CollectibleItem';
import Obstacle from './Obstacle';
import HUD from './HUD';
import MenuScreen from './MenuScreen';
import MiniMap from './MiniMap';
import { ITEMS, OBSTACLES } from './mazeData';
import { useGameStore } from './useGameStore';

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
}

const KEY_MAP = [
  { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Controls.back,    keys: ['ArrowDown', 'KeyS'] },
  { name: Controls.left,    keys: ['ArrowLeft', 'KeyA'] },
  { name: Controls.right,   keys: ['ArrowRight', 'KeyD'] },
];

function Scene() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.15} color="#1a1a3e" />

      {/* Slight fog for atmosphere */}
      <fog attach="fog" args={['#000010', 8, 40]} />

      {/* Player torchlight */}
      <pointLight
        position={[0, 1.2, 0]}
        color="#ffe8c0"
        intensity={3}
        distance={12}
        decay={2}
      />

      <MazeWalls />

      {ITEMS.map(item => (
        <CollectibleItem key={item.id} item={item} />
      ))}

      {OBSTACLES.map(obs => (
        <Obstacle key={obs.id} obstacle={obs} />
      ))}

      <Player />
    </>
  );
}

export default function Game() {
  const phase = useGameStore(s => s.phase);
  const showMenu = phase === 'menu' || phase === 'dead' || phase === 'won';

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {showMenu && <MenuScreen />}

      <KeyboardControls map={KEY_MAP}>
        <Canvas
          camera={{ fov: 80, near: 0.1, far: 200 }}
          gl={{ antialias: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {!showMenu && (
        <>
          <HUD />
          <MiniMap />
        </>
      )}
    </div>
  );
}
