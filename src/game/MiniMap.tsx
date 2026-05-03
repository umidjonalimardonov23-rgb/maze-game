import { useGameStore } from './useGameStore';
import { MAZE_LAYOUT, MAZE_WIDTH, MAZE_HEIGHT, CELL_SIZE, ITEMS } from './mazeData';

const MAP_SCALE = 5;
const MAP_W = MAZE_WIDTH * MAP_SCALE;
const MAP_H = MAZE_HEIGHT * MAP_SCALE;

export default function MiniMap() {
  const { playerPos, collectedItems } = useGameStore();

  const halfW = (MAZE_WIDTH * CELL_SIZE) / 2;
  const halfH = (MAZE_HEIGHT * CELL_SIZE) / 2;

  const playerCol = (playerPos.x + halfW) / CELL_SIZE;
  const playerRow = (playerPos.z + halfH) / CELL_SIZE;

  return (
    <div style={{
      position: 'fixed',
      bottom: 48,
      right: 16,
      width: MAP_W,
      height: MAP_H,
      opacity: 0.75,
      pointerEvents: 'none',
      zIndex: 20,
    }}>
      <svg width={MAP_W} height={MAP_H} style={{ display: 'block' }}>
        {/* Maze cells */}
        {MAZE_LAYOUT.map((row, ri) =>
          row.map((cell, ci) => (
            <rect
              key={`${ci}-${ri}`}
              x={ci * MAP_SCALE}
              y={ri * MAP_SCALE}
              width={MAP_SCALE}
              height={MAP_SCALE}
              fill={cell === 1 ? '#16213e' : '#0a0a1a'}
              stroke="none"
            />
          ))
        )}

        {/* Uncollected items */}
        {ITEMS.filter(item => !collectedItems.has(item.id)).map(item => (
          <circle
            key={item.id}
            cx={item.col * MAP_SCALE + MAP_SCALE / 2}
            cy={item.row * MAP_SCALE + MAP_SCALE / 2}
            r={1.5}
            fill={item.type === 'gem' ? '#00ffff' : item.type === 'star' ? '#ffd700' : '#ff6b35'}
          />
        ))}

        {/* Player dot */}
        <circle
          cx={playerCol * MAP_SCALE}
          cy={playerRow * MAP_SCALE}
          r={3}
          fill="#fff"
          stroke="#00ffff"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
