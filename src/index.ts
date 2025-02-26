import { Grid } from "./models/Grid";
import { dijkstra } from "./algorithms/dijkstra";
import { DEFAULT_GRID_SIZE, GRID_SYMBOLS } from "./utils/constants";
import * as readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const grid = new Grid(DEFAULT_GRID_SIZE.WIDTH, DEFAULT_GRID_SIZE.HEIGHT);
let cursorX = 0;
let cursorY = 0;
let mode: "start" | "end" | "wall" | "pathfinding" = "start";

function displayGrid() {
  console.clear();
  for (let y = 0; y < grid.height; y++) {
    let row = "";
    for (let x = 0; x < grid.width; x++) {
      const node = grid.grid[y][x];
      if (x === cursorX && y === cursorY) {
        row += chalk.white(GRID_SYMBOLS.CURSOR);
      } else if (node.isStart) {
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
  console.log(`\nMode: ${mode}`);
  console.log("Use arrow keys to move the cursor.");
  console.log("Press 's' to set start, 'e' to set end, 'w' to toggle wall.");
  console.log("Press 'Enter' to start pathfinding.");
}

function handleKeyPress(str: string, key: readline.Key) {
  if (key.name === "up" && cursorY > 0) {
    cursorY--;
  } else if (key.name === "down" && cursorY < grid.height - 1) {
    cursorY++;
  } else if (key.name === "left" && cursorX > 0) {
    cursorX--;
  } else if (key.name === "right" && cursorX < grid.width - 1) {
    cursorX++;
  } else if (key.name === "s") {
    mode = "start";
    grid.setStart(cursorX, cursorY);
  } else if (key.name === "e") {
    mode = "end";
    grid.setEnd(cursorX, cursorY);
  } else if (key.name === "w") {
    mode = "wall";
    grid.toggleWall(cursorX, cursorY);
  } else if (key.name === "return") {
    mode = "pathfinding";
    const result = dijkstra(grid);
    result.path.forEach((node) => {
      if (!node.isStart && !node.isEnd) {
        node.isPath = true;
      }
    });
    displayGrid();
    console.log(`\nPath found! Length: ${result.path.length}`);
    console.log(`Nodes visited: ${result.visitedNodes.length}`);
    console.log(`Shortest path coordinates:`);
    result.path.forEach((node) => {
      console.log(`(${node.x}, ${node.y})`);
    });
    rl.close();
    return;
  }
  displayGrid();
}

async function main() {
  console.clear();
  displayGrid();
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.on("keypress", handleKeyPress);
}

main().catch(console.error);
