export class Node {
  public f: number = 0;
  public g: number = 0;
  public h: number = 0;
  public parent: Node | null = null;
  public visited: boolean = false;
  public isPath: boolean = false; // New property to track the shortest path

  constructor(
    public x: number,
    public y: number,
    public isWall: boolean = false,
    public isStart: boolean = false,
    public isEnd: boolean = false
  ) {}

  reset(): void {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = null;
    this.visited = false;
    this.isPath = false; // Reset path when needed
  }
}