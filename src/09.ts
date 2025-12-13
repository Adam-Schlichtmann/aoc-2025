import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

type CoordinatePair = {
  x: number;
  y: number;
};

const parseLine = (line: string): CoordinatePair => {
  const parts = line.split(",");
  return { x: Number(parts[0]), y: Number(parts[1]) };
};

const computeArea = (p1: CoordinatePair, p2: CoordinatePair): number =>
  (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);

class Square {
  public p1: CoordinatePair;
  public p2: CoordinatePair;
  public area: number;

  constructor(p1: CoordinatePair, p2: CoordinatePair) {
    this.p1 = p1;
    this.p2 = p2;
    this.area = computeArea(p1, p2);
  }
}

const part1 = (file: string): number => {
  const lines = readFile(file);
  const pairs = lines.map(parseLine);
  const areas: Square[] = [];
  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      areas.push(new Square(pairs[i], pairs[j]));
    }
  }
  areas.sort((a, b) => b.area - a.area);
  return areas[0].area;
};

class Polygon {
  public orderedVertices: CoordinatePair[];

  constructor(orderedVertices: CoordinatePair[]) {
    this.orderedVertices = orderedVertices;
  }

  public intersectsWithPolygon = (p1: CoordinatePair, p2: CoordinatePair) => {
    const minX = Math.min(p1.x, p2.x);
    const maxX = Math.max(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxY = Math.max(p1.y, p2.y);
    for (let i = 0; i < this.orderedVertices.length; i++) {
      const j = i === this.orderedVertices.length - 1 ? 0 : i + 1;
      const edgeMinX = Math.min(
        this.orderedVertices[i].x,
        this.orderedVertices[j].x
      );
      const edgeMaxX = Math.max(
        this.orderedVertices[i].x,
        this.orderedVertices[j].x
      );
      const edgeMinY = Math.min(
        this.orderedVertices[i].y,
        this.orderedVertices[j].y
      );
      const edgeMaxY = Math.max(
        this.orderedVertices[i].y,
        this.orderedVertices[j].y
      );
      if (
        minX < edgeMaxX &&
        maxX > edgeMinX &&
        minY < edgeMaxY &&
        maxY > edgeMinY
      ) {
        return true;
      }
    }
    return false;
  };

  public isSquareWithinBounds(square: Square) {
    if (this.intersectsWithPolygon(square.p1, square.p2)) return false;

    const corners = [
      square.p1,
      { x: square.p1.x, y: square.p2.y },
      square.p2,
      { x: square.p2.x, y: square.p1.y },
    ];
    return corners.every(
      (c, i, arr) =>
        !this.intersectsWithPolygon(c, arr[i === arr.length - 1 ? 0 : i + 1])
    );
  }
}

const part2 = (file: string): number => {
  const lines = readFile(file);
  const pairs = lines.map(parseLine);

  const areas: Square[] = [];
  const boundingPolygon = new Polygon(pairs);
  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      areas.push(new Square(pairs[i], pairs[j]));
    }
  }
  areas.sort((a, b) => b.area - a.area);
  while (areas.length) {
    const nextBiggest = areas.shift();
    if (!nextBiggest) {
      throw new Error("NOTHING WAS VALID");
    }
    if (boundingPolygon.isSquareWithinBounds(nextBiggest)) {
      return nextBiggest.area;
    }
  }
  return 0;
};

export default () => {
  const testAnswer1 = part1("./src/input/09.test.txt");
  if (testAnswer1 === 50) {
    console.log("Part 1 Answer:", part1("./src/input/09.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/09.test.txt");
  if (testAnswer2 === 24) {
    console.log("Part 2 Answer:", part2("./src/input/09.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
