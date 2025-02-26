import { Node } from "./Node";

export class PriorityQueue {
  private items: Node[] = [];

  enqueue(node: Node): void {
    this.items.push(node);
    this.items.sort((a, b) => a.f - b.f);
  }

  dequeue(): Node | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  includes(node: Node): boolean {
    return this.items.some((item) => item.x === node.x && item.y === node.y);
  }
}