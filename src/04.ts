import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const parseLine = (line: string) => {
  return line.split("").filter(Boolean);
};

const getNodeKey = ({ x, y }: { x: number; y: number }): Key => {
  return `${y}-${x}`;
};

type Key = `${number}-${number}`;
class Node {
  public x: number;
  public y: number;
  public symbol: string;
  public neighbors: Node[] = [];
  public isPaperAccessible = false;

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.neighbors = [];
  }

  print() {
    console.log("=========");
    console.log(`Y: ${this.y}`);
    console.log(`X: ${this.x}`);
    console.log(`Symbol: ${this.symbol}`);
    console.log(`Accessible: ${this.isPaperAccessible}`);
    console.log(
      this.neighbors
        .map((n) => `Y: ${n.y} | X: ${n.x} | S: ${n.symbol}`)
        .join("\n")
    );
    console.log("=========");
  }

  setEdges(neighbors: Node[]) {
    this.neighbors = neighbors;
    if (
      this.symbol === "@" &&
      neighbors.filter((n) => n.symbol === "@").length < 4
    ) {
      this.isPaperAccessible = true;
    } else {
      this.isPaperAccessible = false;
    }
  }

  getNeighborKeys(): Key[] {
    return [-1, 0, 1]
      .flatMap((x) =>
        [-1, 0, 1].map((y) => getNodeKey({ x: this.x + x, y: this.y + y }))
      )
      .filter((k) => k !== getNodeKey({ x: this.x, y: this.y }));
  }
}

class Graph {
  public nodes: Map<Key, Node>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(node: Node) {
    this.nodes.set(getNodeKey({ x: node.x, y: node.y }), node);
  }

  buildEdges() {
    const removeKeys: Key[] = [];
    this.nodes.forEach((node) => {
      const keys = node.getNeighborKeys();
      const neighbors = keys
        .map((k) => this.nodes.get(k))
        .filter((n): n is Node => Boolean(n));
      if (node.symbol === "@" || neighbors.some((n) => n.symbol === "@")) {
        node.setEdges(neighbors);
      } else {
        removeKeys.push(getNodeKey({ x: node.x, y: node.y }));
      }
    });

    removeKeys.forEach((k) => this.nodes.delete(k));
  }

  getNode({ x, y }: { x: number; y: number }): Node | undefined {
    return this.nodes.get(getNodeKey({ x, y }));
  }

  countAccesssibleNodes(): number {
    return this.nodes
      .values()
      .filter((n) => n.isPaperAccessible)
      .toArray().length;
  }

  removeAccessiblePaper() {
    this.nodes.values().forEach((node) => {
      if (node.isPaperAccessible) {
        node.symbol = "X";
      }
    });
  }
}

const part1 = (file: string): number => {
  const lines = readFile(file);
  const graph = new Graph();
  for (let y = 0; y < lines.length; y++) {
    const nodes = parseLine(lines[y]);
    for (let x = 0; x < nodes.length; x++) {
      graph.addNode(new Node(x, y, nodes[x]));
    }
  }
  graph.buildEdges();
  return graph.countAccesssibleNodes();
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  const graph = new Graph();
  for (let y = 0; y < lines.length; y++) {
    const nodes = parseLine(lines[y]);
    for (let x = 0; x < nodes.length; x++) {
      graph.addNode(new Node(x, y, nodes[x]));
    }
  }
  let last = -1;
  let count = 0;
  while (last !== count) {
    last = count;
    graph.buildEdges();
    count += graph.countAccesssibleNodes();
    graph.removeAccessiblePaper();
  }
  return count;
};

export default () => {
  const testAnswer1 = part1("./src/input/04.test.txt");
  if (testAnswer1 === 13) {
    console.log("Part 1 Answer:", part1("./src/input/04.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/04.test.txt");
  if (testAnswer2 === 43) {
    console.log("Part 2 Answer:", part2("./src/input/04.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
