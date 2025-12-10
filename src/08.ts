import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const calculateDistance = (n1: Node, n2: Node) => {
  return Math.sqrt(
    (n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2 + (n2.z - n1.z) ** 2
  );
};

class Circuit {
  public nodes: Set<Node> = new Set();

  constructor(nodes: Node[]) {
    this.nodes = new Set(nodes);
  }

  public addNodes(nodes: Node[]) {
    for (const node of nodes) {
      this.nodes.add(node);
    }
  }
}

class Node {
  public x: number = -1;
  public y: number = -1;
  public z: number = -1;
  public id: string = "";

  constructor(line: string) {
    const [x, y, z] = line.split(",");
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
    this.id = line;
  }
}

type Distances = {
  n1: Node;
  n2: Node;
  distance: number;
};

const getNodes = (lines: string[]): Node[] =>
  lines
    .map((l) => new Node(l))
    .sort((a, b) => {
      if (a.x === b.x) {
        if (a.y === b.y) {
          return a.z - b.z;
        }
        return a.y - b.y;
      }
      return a.x - b.x;
    });

const getDistances = (nodes: Node[]): Distances[] => {
  const distances: Distances[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      distances.push({
        n1: nodes[i],
        n2: nodes[j],
        distance: calculateDistance(nodes[i], nodes[j]),
      });
    }
  }
  return distances.sort((a, b) => a.distance - b.distance);
};

const iterateCircuits = (
  distances: Distances[],
  iterations: number
): Circuit[] => {
  const circuits: Circuit[] = [];

  for (let iteration = 0; iteration < iterations; iteration++) {
    const closest = distances.shift();

    if (!closest) {
      throw new Error("No closest distance");
    }

    const n1Circuit = circuits.findIndex((c) => c.nodes.has(closest.n1));
    const n2Circuit = circuits.findIndex((c) => c.nodes.has(closest.n2));

    if (n1Circuit > -1 && n2Circuit > -1) {
      if (n1Circuit !== n2Circuit) {
        circuits[n1Circuit].addNodes(Array.from(circuits[n2Circuit].nodes));
        circuits.splice(n2Circuit, 1);
      }
    } else if (n1Circuit > -1) {
      circuits[n1Circuit].addNodes([closest.n2]);
    } else if (n2Circuit > -1) {
      circuits[n2Circuit].addNodes([closest.n1]);
    } else {
      circuits.push(new Circuit([closest.n1, closest.n2]));
    }
  }
  return circuits;
};

const getCompleteCircuit = (
  distances: Distances[],
  allNodes: number
): number => {
  const circuits: Circuit[] = [];

  let run = true;
  while (run) {
    const closest = distances.shift();

    if (!closest) {
      throw new Error("No closest distance");
    }

    const n1Circuit = circuits.findIndex((c) => c.nodes.has(closest.n1));
    const n2Circuit = circuits.findIndex((c) => c.nodes.has(closest.n2));

    if (n1Circuit > -1 && n2Circuit > -1) {
      if (n1Circuit !== n2Circuit) {
        circuits[n1Circuit].addNodes(Array.from(circuits[n2Circuit].nodes));
        if (circuits[n1Circuit].nodes.size === allNodes) {
          return closest.n1.x * closest.n2.x;
        }
        circuits.splice(n2Circuit, 1);
      }
    } else if (n1Circuit > -1) {
      circuits[n1Circuit].addNodes([closest.n2]);
      if (circuits[n1Circuit].nodes.size === allNodes) {
        return closest.n1.x * closest.n2.x;
      }
    } else if (n2Circuit > -1) {
      circuits[n2Circuit].addNodes([closest.n1]);
      if (circuits[n2Circuit].nodes.size === allNodes) {
        return closest.n1.x * closest.n2.x;
      }
    } else {
      circuits.push(new Circuit([closest.n1, closest.n2]));
    }
  }
  return 0;
};

const part1 = (file: string, iterations: number): number => {
  const lines = readFile(file);
  const nodes = getNodes(lines);
  const distances = getDistances(nodes);

  const circuits = iterateCircuits(distances, iterations);
  circuits.sort((a, b) => b.nodes.size - a.nodes.size);

  return (
    circuits[0].nodes.size * circuits[1].nodes.size * circuits[2].nodes.size
  );
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  const nodes = getNodes(lines);
  const distances = getDistances(nodes);
  return getCompleteCircuit(distances, nodes.length);
};

export default () => {
  const testAnswer1 = part1("./src/input/08.test.txt", 10);
  if (testAnswer1 === 40) {
    console.log("Part 1 Answer:", part1("./src/input/08.txt", 1000));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/08.test.txt");
  if (testAnswer2 === 25272) {
    console.log("Part 2 Answer:", part2("./src/input/08.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
