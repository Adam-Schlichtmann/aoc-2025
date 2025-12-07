import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const getDividerIndices = (lines: string[]) => {
  const indices: number[] = [-1];

  for (let i = 0; i < lines[0].length; i++) {
    if (lines.every((line) => line[i] === " ")) {
      indices.push(i);
    }
  }
  indices.push(lines[0].length);
  return indices;
};

const parseColumn = (lines: string[], start: number, end: number): string[] => {
  return lines.map((line) => line.slice(start + 1, end));
};

const getProblems = (lines: string[]) => {
  const dividers = getDividerIndices(lines);
  const problems: string[][] = [];
  for (let i = 0; i < dividers.length - 1; i++) {
    problems.push(parseColumn(lines, dividers[i], dividers[i + 1]));
  }
  return problems;
};

const solveProblem = (lines: string[]): number => {
  const operation = lines.pop()?.trim();
  const numbers = lines.map(Number);
  if (operation === "*") {
    return numbers.reduce((acc, item) => acc * item, 1);
  }
  if (operation === "+") {
    return numbers.reduce((acc, item) => acc + item, 0);
  }
  throw new Error(`Unknown Operation ${operation}`);
};

const part1 = (file: string): number => {
  const lines = readFile(file);
  const problems = getProblems(lines);
  return problems.reduce((acc, item) => {
    return acc + solveProblem(item);
  }, 0);
};

const solveProblemP2 = (lines: string[]): number => {
  const operation = lines.pop()?.trim();
  const numbers: number[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    const n = lines.map((l) => l[i].trim()).join("");
    numbers.push(Number(n));
  }
  if (operation === "*") {
    return numbers.reduce((acc, item) => acc * item, 1);
  }
  if (operation === "+") {
    return numbers.reduce((acc, item) => acc + item, 0);
  }
  throw new Error(`Unknown Operation ${operation}`);
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  const problems = getProblems(lines);
  return problems.reduce((acc, item) => {
    return acc + solveProblemP2(item);
  }, 0);
};

export default () => {
  const testAnswer1 = part1("./src/input/06.test.txt");
  if (testAnswer1 === 4277556) {
    console.log("Part 1 Answer:", part1("./src/input/06.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/06.test.txt");
  if (testAnswer2 === 3263827) {
    console.log("Part 2 Answer:", part2("./src/input/06.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
