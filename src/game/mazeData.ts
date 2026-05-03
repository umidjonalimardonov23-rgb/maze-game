// 0 = open path, 1 = wall
export const MAZE_WIDTH = 19;
export const MAZE_HEIGHT = 19;
export const CELL_SIZE = 4;
export const WALL_HEIGHT = 3;

export const MAZE_LAYOUT: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export interface ItemPosition {
  id: number;
  col: number;
  row: number;
  type: 'gem' | 'star' | 'coin';
  points: number;
}

export interface ObstaclePosition {
  id: number;
  col: number;
  row: number;
}

// Pre-calculated item positions (open cells only)
export const ITEMS: ItemPosition[] = [
  { id: 0,  col: 1,  row: 1,  type: 'gem',  points: 50 },
  { id: 1,  col: 5,  row: 1,  type: 'coin', points: 10 },
  { id: 2,  col: 9,  row: 1,  type: 'star', points: 30 },
  { id: 3,  col: 15, row: 1,  type: 'coin', points: 10 },
  { id: 4,  col: 3,  row: 3,  type: 'gem',  points: 50 },
  { id: 5,  col: 9,  row: 3,  type: 'coin', points: 10 },
  { id: 6,  col: 1,  row: 5,  type: 'star', points: 30 },
  { id: 7,  col: 7,  row: 5,  type: 'gem',  points: 50 },
  { id: 8,  col: 11, row: 5,  type: 'coin', points: 10 },
  { id: 9,  col: 17, row: 5,  type: 'star', points: 30 },
  { id: 10, col: 3,  row: 7,  type: 'coin', points: 10 },
  { id: 11, col: 9,  row: 7,  type: 'gem',  points: 50 },
  { id: 12, col: 15, row: 7,  type: 'coin', points: 10 },
  { id: 13, col: 5,  row: 9,  type: 'star', points: 30 },
  { id: 14, col: 11, row: 9,  type: 'coin', points: 10 },
  { id: 15, col: 1,  row: 11, type: 'gem',  points: 50 },
  { id: 16, col: 7,  row: 11, type: 'coin', points: 10 },
  { id: 17, col: 13, row: 11, type: 'star', points: 30 },
  { id: 18, col: 3,  row: 13, type: 'coin', points: 10 },
  { id: 19, col: 9,  row: 13, type: 'gem',  points: 50 },
  { id: 20, col: 15, row: 13, type: 'coin', points: 10 },
  { id: 21, col: 5,  row: 15, type: 'star', points: 30 },
  { id: 22, col: 11, row: 15, type: 'coin', points: 10 },
  { id: 23, col: 1,  row: 17, type: 'gem',  points: 50 },
  { id: 24, col: 7,  row: 17, type: 'star', points: 30 },
  { id: 25, col: 13, row: 17, type: 'coin', points: 10 },
  { id: 26, col: 17, row: 17, type: 'gem',  points: 50 },
];

export const OBSTACLES: ObstaclePosition[] = [
  { id: 0, col: 5,  row: 3  },
  { id: 1, col: 13, row: 3  },
  { id: 2, col: 3,  row: 9  },
  { id: 3, col: 9,  row: 11 },
  { id: 4, col: 15, row: 11 },
  { id: 5, col: 5,  row: 17 },
];

export function cellToWorld(col: number, row: number): [number, number] {
  const halfW = (MAZE_WIDTH * CELL_SIZE) / 2;
  const halfH = (MAZE_HEIGHT * CELL_SIZE) / 2;
  return [col * CELL_SIZE - halfW + CELL_SIZE / 2, row * CELL_SIZE - halfH + CELL_SIZE / 2];
}

export function isWall(col: number, row: number): boolean {
  if (row < 0 || row >= MAZE_HEIGHT || col < 0 || col >= MAZE_WIDTH) return true;
  return MAZE_LAYOUT[row][col] === 1;
}
