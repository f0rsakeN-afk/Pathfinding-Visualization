import { Node } from "../models/Node";
import { Grid } from "../models/Grid";
import { PriorityQueue } from "../models/PriorityQueue";
import { PathfindingResult } from "./types";

export function dijkstra(grid: Grid): PathfindingResult {
  const visitedNodes: Node[] = [];
  const queue = new PriorityQueue();

  if (!grid.startNode || !grid.endNode) {
    throw new Error("Start and end nodes must be set");
  }

  grid.startNode.g = 0;
  queue.enqueue(grid.startNode);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (!current) continue;

    if (current.visited) continue;
    current.visited = true;
    visitedNodes.push(current);

    if (current === grid.endNode) {
      return {
        path: reconstructPath(grid.endNode),
        visitedNodes,
      };
    }

    for (const neighbor of grid.getNeighbors(current)) {
      if (neighbor.visited) continue;

      const tentativeG = current.g + 1;
      if (tentativeG < neighbor.g || neighbor.g === 0) {
        neighbor.parent = current;
        neighbor.g = tentativeG;
        neighbor.f = tentativeG;
        if (!queue.includes(neighbor)) {
          queue.enqueue(neighbor);
        }
      }
    }
  }

  return { path: [], visitedNodes };
}

function reconstructPath(endNode: Node): Node[] {
  const path: Node[] = [];
  let current: Node | null = endNode;

  while (current !== null) {
    path.unshift(current);
    current = current.parent;
  }

  return path;
}