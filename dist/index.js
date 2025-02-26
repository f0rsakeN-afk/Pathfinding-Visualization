"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = require("./models/Grid");
const dijkstra_1 = require("./algorithms/dijkstra");
const constants_1 = require("./utils/constants");
const readline = __importStar(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});
const grid = new Grid_1.Grid(constants_1.DEFAULT_GRID_SIZE.WIDTH, constants_1.DEFAULT_GRID_SIZE.HEIGHT);
let cursorX = 0;
let cursorY = 0;
let mode = "start";
function displayGrid() {
    console.clear();
    for (let y = 0; y < grid.height; y++) {
        let row = "";
        for (let x = 0; x < grid.width; x++) {
            const node = grid.grid[y][x];
            if (x === cursorX && y === cursorY) {
                row += chalk_1.default.white(constants_1.GRID_SYMBOLS.CURSOR);
            }
            else if (node.isStart) {
                row += chalk_1.default.green(constants_1.GRID_SYMBOLS.START);
            }
            else if (node.isEnd) {
                row += chalk_1.default.red(constants_1.GRID_SYMBOLS.END);
            }
            else if (node.isWall) {
                row += chalk_1.default.gray(constants_1.GRID_SYMBOLS.WALL);
            }
            else if (node.isPath) {
                row += chalk_1.default.yellow(constants_1.GRID_SYMBOLS.PATH);
            }
            else if (node.visited) {
                row += chalk_1.default.blue(constants_1.GRID_SYMBOLS.VISITED);
            }
            else {
                row += constants_1.GRID_SYMBOLS.EMPTY;
            }
        }
        console.log(row);
    }
    console.log(`\nMode: ${mode}`);
    console.log("Use arrow keys to move the cursor.");
    console.log("Press 's' to set start, 'e' to set end, 'w' to toggle wall.");
    console.log("Press 'Enter' to start pathfinding.");
}
function handleKeyPress(str, key) {
    if (key.name === "up" && cursorY > 0) {
        cursorY--;
    }
    else if (key.name === "down" && cursorY < grid.height - 1) {
        cursorY++;
    }
    else if (key.name === "left" && cursorX > 0) {
        cursorX--;
    }
    else if (key.name === "right" && cursorX < grid.width - 1) {
        cursorX++;
    }
    else if (key.name === "s") {
        mode = "start";
        grid.setStart(cursorX, cursorY);
    }
    else if (key.name === "e") {
        mode = "end";
        grid.setEnd(cursorX, cursorY);
    }
    else if (key.name === "w") {
        mode = "wall";
        grid.toggleWall(cursorX, cursorY);
    }
    else if (key.name === "return") {
        mode = "pathfinding";
        const result = (0, dijkstra_1.dijkstra)(grid);
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
