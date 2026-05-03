import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ObstaclePosition, cellToWorld, CELL_SIZE, isWall } from './mazeData';
import { useGameStore } from './useGameStore';

const HIT_RADIUS = 1.2;
const HIT_COOLDOWN = 2.0;
const MOVE_SPEED = 1.5;

interface Props {
  obstacle: ObstaclePosition;
}

export default function Obstacle({ obstacle }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [wx, wz] = cellToWorld(obstacle.col, obstacle.row);
  const posRef = useRef({ x: wx, z: wz });
  const dirRef = useRef({ x: 1, z: 0 });
  const lastHitRef = useRef(0);
  const { hitObstacle, playerPos, phase } = useGameStore();

  useFrame(({ clock }, delta) => {
    if (!meshRef.current || phase !== 'playing') return;

    const pos = posRef.current;
    const dir = dirRef.current;
    const t = clock.getElapsedTime();

    // Move obstacle
    const nx = pos.x + dir.x * MOVE_SPEED * delta;
    const nz = pos.z + dir.z * MOVE_SPEED * delta;

    // Convert world to grid for wall check
    const halfW = (19 * CELL_SIZE) / 2;
    const halfH = (19 * CELL_SIZE) / 2;
    const checkCol = Math.round((nx + halfW - CELL_SIZE / 2) / CELL_SIZE);
    const checkRow = Math.round((nz + halfH - CELL_SIZE / 2) / CELL_SIZE);

    if (isWall(checkCol, checkRow)) {
      // Reverse direction
      dir.x = -dir.x;
      dir.z = -dir.z;
    } else {
      pos.x = nx;
      pos.z = nz;
    }

    meshRef.current.position.set(pos.x, 0.6, pos.z);
    meshRef.current.rotation.y = t * 2;

    // Check player collision
    const dx = playerPos.x - pos.x;
    const dz = playerPos.z - pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < HIT_RADIUS && t - lastHitRef.current > HIT_COOLDOWN) {
      lastHitRef.current = t;
      hitObstacle();
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[wx, 0.6, wz]} castShadow>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#ff2244"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <pointLight
        position={[wx, 0.6, wz]}
        color="#ff2244"
        intensity={1}
        distance={4}
        decay={2}
      />
    </group>
  );
}
