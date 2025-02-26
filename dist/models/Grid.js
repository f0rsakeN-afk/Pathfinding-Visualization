"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const Node_1 = require("./Node");
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("../utils/constants");
class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.initialize();
    }
    initialize() {
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = new Node_1.Node(x, y);
            }
        }
    }
    setStart(x, y) {
        if (this.startNode) {
            this.startNode.isStart = false;
        }
        this.startNode = this.grid[y][x];
        this.startNode.isStart = true;
    }
    setEnd(x, y) {
        if (this.endNode) {
            this.endNode.isEnd = false;
        }
        this.endNode = this.grid[y][x];
        this.endNode.isEnd = true;
    }
    toggleWall(x, y) {
        this.grid[y][x].isWall = !this.grid[y][x].isWall;
    }
    getNeighbors(node) {
        const neighbors = [];
        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];
        for (const [dx, dy] of directions) {
            const newX = node.x + dx;
            const newY = node.y + dy;
            if (newX >= 0 &&
                newX < this.width &&
                newY >= 0 &&
                newY < this.height &&
                !this.grid[newY][newX].isWall) {
                neighbors.push(this.grid[newY][newX]);
            }
        }
        return neighbors;
    }
    display() {
        console.clear();
        for (let y = 0; y < this.height; y++) {
            let row = "";
            for (let x = 0; x < this.width; x++) {
                const node = this.grid[y][x];
                if (node.isStart) {
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
    }
}
exports.Grid = Grid;
