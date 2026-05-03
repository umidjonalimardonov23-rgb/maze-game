import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { isWall, CELL_SIZE, MAZE_WIDTH, MAZE_HEIGHT } from './mazeData';
import { useGameStore } from './useGameStore';

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
}

const MOVE_SPEED = 5;
const TURN_SPEED = 2.2;
const PLAYER_HEIGHT = 1.2;
const PLAYER_RADIUS = 0.5;
const START_X = -MAZE_WIDTH * CELL_SIZE / 2 + CELL_SIZE * 1.5;
const START_Z = -MAZE_HEIGHT * CELL_SIZE / 2 + CELL_SIZE * 1.5;

export default function Player() {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls<Controls>();
  const { setPlayerPos, phase } = useGameStore();
  const yawRef = useRef(0);
  const posRef = useRef(new THREE.Vector3(START_X, PLAYER_HEIGHT, START_Z));

  useEffect(() => {
    camera.position.copy(posRef.current);
    camera.rotation.set(0, yawRef.current, 0);
    camera.rotation.order = 'YXZ';
    setPlayerPos(posRef.current.x, posRef.current.z);
  }, []);

  useFrame((_, delta) => {
    if (phase !== 'playing') return;

    const keys = getKeys();
    const pos = posRef.current;
    let yaw = yawRef.current;

    if (keys.left) yaw += TURN_SPEED * delta;
    if (keys.right) yaw -= TURN_SPEED * delta;
    yawRef.current = yaw;

    const dx = -Math.sin(yaw);
    const dz = -Math.cos(yaw);

    let moveX = 0;
    let moveZ = 0;

    if (keys.forward) { moveX += dx; moveZ += dz; }
    if (keys.back)    { moveX -= dx; moveZ -= dz; }

    if (moveX !== 0 || moveZ !== 0) {
      const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX = (moveX / len) * MOVE_SPEED * delta;
      moveZ = (moveZ / len) * MOVE_SPEED * delta;

      const halfW = (MAZE_WIDTH * CELL_SIZE) / 2;
      const halfH = (MAZE_HEIGHT * CELL_SIZE) / 2;

      const tryX = pos.x + moveX;
      const tryZ = pos.z + moveZ;

      const colX = Math.floor((tryX + halfW) / CELL_SIZE);
      const rowX = Math.floor((pos.z + halfH) / CELL_SIZE);
      const colZ = Math.floor((pos.x + halfW) / CELL_SIZE);
      const rowZ = Math.floor((tryZ + halfH) / CELL_SIZE);

      if (!isWall(colX, rowX)) pos.x = tryX;
      if (!isWall(colZ, rowZ)) pos.z = tryZ;
    }

    camera.position.set(pos.x, PLAYER_HEIGHT, pos.z);
    camera.rotation.set(0, yaw, 0, 'YXZ');
    setPlayerPos(pos.x, pos.z);
  });

  return null;
}
