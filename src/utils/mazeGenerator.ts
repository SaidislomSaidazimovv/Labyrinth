import { useMemo } from "react";

export interface MazeCell {
  x: number;
  y: number;
  isWall: boolean;
}

export function generateMaze(width: number, height: number): MazeCell[][] {
  // Initialize maze with all walls
  const maze: MazeCell[][] = [];
  for (let x = 0; x < width; x++) {
    maze[x] = [];
    for (let y = 0; y < height; y++) {
      maze[x][y] = { x, y, isWall: true };
    }
  }

  // Randomized Prim's Algorithm
  const frontier: [number, number][] = [];
  
  // Start from a random odd cell
  let startX = Math.floor(Math.random() * (width / 2)) * 2 + 1;
  let startY = Math.floor(Math.random() * (height / 2)) * 2 + 1;
  
  // Ensure start is within bounds
  startX = Math.min(startX, width - 2);
  startY = Math.min(startY, height - 2);
  
  maze[startX][startY].isWall = false;
  
  // Add neighbors to frontier
  const addFrontier = (x: number, y: number) => {
    const directions = [
      [0, 2], [0, -2], [2, 0], [-2, 0]
    ];
    
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
        if (maze[nx][ny].isWall) {
          const exists = frontier.some(([fx, fy]) => fx === nx && fy === ny);
          if (!exists) {
            frontier.push([nx, ny]);
          }
        }
      }
    }
  };
  
  addFrontier(startX, startY);
  
  while (frontier.length > 0) {
    // Pick random frontier cell
    const index = Math.floor(Math.random() * frontier.length);
    const [cx, cy] = frontier[index];
    frontier.splice(index, 1);
    
    // Find neighbors that are already paths
    const neighbors: [number, number][] = [];
    const directions = [
      [0, 2], [0, -2], [2, 0], [-2, 0]
    ];
    
    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;
      
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
        if (!maze[nx][ny].isWall) {
          neighbors.push([nx, ny]);
        }
      }
    }
    
    if (neighbors.length > 0) {
      // Connect to random path neighbor
      const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Carve path
      maze[cx][cy].isWall = false;
      maze[(cx + nx) / 2][(cy + ny) / 2].isWall = false;
      
      addFrontier(cx, cy);
    }
  }
  
  return maze;
}

export function useMaze(width: number, height: number, seed?: number) {
  return useMemo(() => {
    return generateMaze(width, height);
  }, [width, height, seed]);
}
