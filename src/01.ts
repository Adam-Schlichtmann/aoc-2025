import { readFileSync } from "fs";

const readFile = () => {
  const content = readFileSync("./src/input/01.txt", "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const parseLine = (line: string) => {
  const value = line.replace(/\D/g, "");
  return { value: Number(value), right: line.startsWith("R") };
};

const part1 = () => {
  const lines = readFile();
  let current = 50;
  let answer = 0;
  for (const line of lines) {
    const { right, value } = parseLine(line);
    current += (right ? 1 : -1) * value;
    if (current % 100 === 0) {
      answer++;
    }
  }
  console.log("Resulting Password:", answer);
};

const part2 = () => {
  const lines = readFile();
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
  console.log("Resulting Password:", answer);
};

export default () => {
  part1();
  part2();
};
