import { Node } from "../models/Node";

export interface PathfindingResult {
  path: Node[];
  visitedNodes: Node[];
}
