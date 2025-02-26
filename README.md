# Pathfinding Visualization with Dijkstra's Algorithm

This project is a simple pathfinding visualization tool using Dijkstra's algorithm. It allows you to interactively set the start and end points, add walls, and visualize the shortest path on a grid.

## Features

- Interactive grid with cursor control
- Set start and end points
- Add and remove walls
- Visualize the shortest path using Dijkstra's algorithm
- Display the coordinates of the shortest path

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/f0rsakeN-afk/pathfinding-visualization.git
    cd pathfinding-visualization
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Run the application:
    ```sh
    npm start
    ```

2. Use the arrow keys to move the cursor on the grid.

3. Press `s` to set the start point, `e` to set the end point, and `w` to toggle walls.

4. Press `Enter` to start the pathfinding algorithm.

5. The grid will display the shortest path and the coordinates of the path will be listed in the console.

## Grid Symbols

- `S`: Start point
- `E`: End point
- `■`: Wall
- `●`: Shortest path
- `×`: Visited nodes
- `█`: Cursor

## Example

![Example](example.png)

## Project Structure

```plaintext
.
├── src
│   ├── algorithms
│   │   ├── dijkstra.ts
│   │   └── types.ts
│   ├── models
│   │   ├── Grid.ts
│   │   ├── Node.ts
│   │   └── PriorityQueue.ts
│   ├── utils
│   │   └── constants.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
