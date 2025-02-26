"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkstra = dijkstra;
const PriorityQueue_1 = require("../models/PriorityQueue");
function dijkstra(grid) {
    const visitedNodes = [];
    const queue = new PriorityQueue_1.PriorityQueue();
    if (!grid.startNode || !grid.endNode) {
        throw new Error("Start and end nodes must be set");
    }
    grid.startNode.g = 0;
    queue.enqueue(grid.startNode);
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        if (!current)
            continue;
        if (current.visited)
            continue;
        current.visited = true;
        visitedNodes.push(current);
        if (current === grid.endNode) {
            return {
                path: reconstructPath(grid.endNode),
                visitedNodes,
            };
        }
        for (const neighbor of grid.getNeighbors(current)) {
            if (neighbor.visited)
                continue;
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
function reconstructPath(endNode) {
    const path = [];
    let current = endNode;
    while (current !== null) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}
