import { readFileSync } from "fs";

const readFile = () => {
  const content = readFileSync("./src/input/01.txt", "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const parseLine = (line: string): number => {
  const direction = line.startsWith("R") ? 1 : -1;
  const value = line.replace(/\D/g, "");
  return Number(value) * direction;
};

const part1 = () => {
  const lines = readFile();
  let current = 50;
  let answer = 0;
  for (const line of lines) {
    current += parseLine(line);
    if (current % 100 === 0) {
      answer++;
    }
  }
  console.log("Resulting Password:", answer);
};

const part2 = () => {
  readFile();
};

export default () => {
  part1();
  part2();
};
