import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const parseLine = (line: string) => {
  return line;
};

const part1 = (file: string): number => {
  const lines = readFile(file);
  return 0;
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  return 0;
};

export default () => {
  const testAnswer1 = part1("./src/input/06.test.txt");
  if (testAnswer1 === 0) {
    console.log("Part 1 Answer:", part1("./src/input/06.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/06.test.txt");
  if (testAnswer2 === 0) {
    console.log("Part 2 Answer:", part2("./src/input/06.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
