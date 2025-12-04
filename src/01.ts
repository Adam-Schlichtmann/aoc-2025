import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const parseLine = (line: string) => {
  const value = line.replace(/\D/g, "");
  return { value: Number(value), right: line.startsWith("R") };
};

const part1 = (file: string): number => {
  const lines = readFile(file);
  let current = 50;
  let answer = 0;
  for (const line of lines) {
    const { right, value } = parseLine(line);
    current += (right ? 1 : -1) * value;
    if (current % 100 === 0) {
      answer++;
    }
  }

  return answer;
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  let current = 50;
  let answer = 0;
  for (const line of lines) {
    const startedAt0 = current === 0;
    const { right, value } = parseLine(line);
    answer += Math.floor(Math.abs(value) / 100);
    const delta = value % 100;
    current += (right ? 1 : -1) * delta;
    if (current < 0) {
      if (!startedAt0) answer++;
      current = 100 + current;
    } else if (current > 99) {
      answer++;
      current %= 100;
    } else if (current % 100 === 0) {
      answer++;
    }
  }

  return answer;
};

export default () => {
  const testAnswer1 = part1("./src/input/01.test.txt");
  if (testAnswer1 === 3) {
    console.log("Part 1 Answer:", part1("./src/input/01.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/01.test.txt");
  if (testAnswer2 === 6) {
    console.log("Part 2 Answer:", part2("./src/input/01.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
