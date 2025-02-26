import { Node } from "./Node";
import chalk from "chalk";
import { GRID_SYMBOLS } from "../utils/constants";

export class Grid {
  public grid: Node[][] = [];
  public startNode: Node | null = null;
  public endNode: Node | null = null;

  constructor(public width: number, public height: number) {
    this.initialize();
  }

  initialize(): void {
    for (let y = 0; y < this.height; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = new Node(x, y);
      }
    }
  }

  setStart(x: number, y: number): void {
    if (this.startNode) {
      this.startNode.isStart = false;
    }
    this.startNode = this.grid[y][x];
    this.startNode.isStart = true;
  }

  setEnd(x: number, y: number): void {
    if (this.endNode) {
      this.endNode.isEnd = false;
    }
    this.endNode = this.grid[y][x];
    this.endNode.isEnd = true;
  }

  toggleWall(x: number, y: number): void {
    this.grid[y][x].isWall = !this.grid[y][x].isWall;
  }

  getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dx, dy] of directions) {
      const newX = node.x + dx;
      const newY = node.y + dy;

      if (
        newX >= 0 &&
        newX < this.width &&
        newY >= 0 &&
        newY < this.height &&
        !this.grid[newY][newX].isWall
      ) {
        neighbors.push(this.grid[newY][newX]);
      }
    }

    return neighbors;
  }

  display(): void {
    console.clear();
    for (let y = 0; y < this.height; y++) {
      let row = "";
      for (let x = 0; x < this.width; x++) {
        const node = this.grid[y][x];

        if (node.isStart) {
          row += chalk.green(GRID_SYMBOLS.START);
        } else if (node.isEnd) {
          row += chalk.red(GRID_SYMBOLS.END);
        } else if (node.isWall) {
          row += chalk.gray(GRID_SYMBOLS.WALL);
        } else if (node.isPath) {
          row += chalk.yellow(GRID_SYMBOLS.PATH);
        } else if (node.visited) {
          row += chalk.blue(GRID_SYMBOLS.VISITED);
        } else {
          row += GRID_SYMBOLS.EMPTY;
        }
      }
      console.log(row);
    }
  }
}