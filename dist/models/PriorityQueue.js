"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(node) {
        this.items.push(node);
        this.items.sort((a, b) => a.f - b.f);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    includes(node) {
        return this.items.some((item) => item.x === node.x && item.y === node.y);
    }
}
exports.PriorityQueue = PriorityQueue;
