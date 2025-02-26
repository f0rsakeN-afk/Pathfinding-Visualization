"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(x, y, isWall = false, isStart = false, isEnd = false) {
        this.x = x;
        this.y = y;
        this.isWall = isWall;
        this.isStart = isStart;
        this.isEnd = isEnd;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
        this.visited = false;
        this.isPath = false; // New property to track the shortest path
    }
    reset() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
        this.visited = false;
        this.isPath = false; // Reset path when needed
    }
}
exports.Node = Node;
