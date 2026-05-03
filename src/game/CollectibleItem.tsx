import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ItemPosition, cellToWorld } from './mazeData';
import { useGameStore } from './useGameStore';

const COLLECT_RADIUS = 1.5;

const COLORS: Record<string, string> = {
  gem: '#00ffff',
  star: '#ffd700',
  coin: '#ff6b35',
};

const LABELS: Record<string, string> = {
  gem: 'GEM',
  star: 'STAR',
  coin: 'COIN',
};

interface Props {
  item: ItemPosition;
}

export default function CollectibleItem({ item }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { collectedItems, collectItem, playerPos, phase } = useGameStore();

  const [wx, wz] = cellToWorld(item.col, item.row);
  const color = COLORS[item.type];

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (collectedItems.has(item.id)) {
      meshRef.current.visible = false;
      return;
    }
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 1.5;
    meshRef.current.position.y = 0.8 + Math.sin(t * 2 + item.id) * 0.2;

    if (phase !== 'playing') return;
    const dx = playerPos.x - wx;
    const dz = playerPos.z - wz;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < COLLECT_RADIUS) {
      collectItem(item.id, item.points, LABELS[item.type]);
    }
  });

  if (collectedItems.has(item.id)) return null;

  return (
    <group position={[wx, 0.8, wz]}>
      <mesh ref={meshRef} castShadow>
        {item.type === 'gem' && <octahedronGeometry args={[0.35, 0]} />}
        {item.type === 'star' && <icosahedronGeometry args={[0.35, 0]} />}
        {item.type === 'coin' && <cylinderGeometry args={[0.3, 0.3, 0.12, 16]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Glow ring */}
      <pointLight color={color} intensity={0.8} distance={3} decay={2} />
    </group>
  );
}
