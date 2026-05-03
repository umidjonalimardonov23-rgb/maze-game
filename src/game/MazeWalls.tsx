import { useMemo } from 'react';
import { MAZE_LAYOUT, MAZE_WIDTH, MAZE_HEIGHT, CELL_SIZE, WALL_HEIGHT, cellToWorld } from './mazeData';

export default function MazeWalls() {
  const walls = useMemo(() => {
    const result: { key: string; x: number; z: number }[] = [];
    for (let row = 0; row < MAZE_HEIGHT; row++) {
      for (let col = 0; col < MAZE_WIDTH; col++) {
        if (MAZE_LAYOUT[row][col] === 1) {
          const [x, z] = cellToWorld(col, row);
          result.push({ key: `${col}-${row}`, x, z });
        }
      }
    }
    return result;
  }, []);

  const floorSize = useMemo(() => [MAZE_WIDTH * CELL_SIZE, MAZE_HEIGHT * CELL_SIZE] as [number, number], []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={floorSize} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, 0]}>
        <planeGeometry args={floorSize} />
        <meshStandardMaterial color="#0d0d1a" />
      </mesh>

      {/* Walls */}
      {walls.map(({ key, x, z }) => (
        <mesh key={key} position={[x, WALL_HEIGHT / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[CELL_SIZE, WALL_HEIGHT, CELL_SIZE]} />
          <meshStandardMaterial color="#16213e" emissive="#0f3460" emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  );
}
