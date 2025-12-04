import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const ranges = content.split(",").filter(Boolean);
  return ranges;
};

const parseLine = (range: string) => {
  const [start, finish] = range.split("-");
  return { start: Number(start), finish: Number(finish) };
};

const singleRepeatedGroup = /^(.+)\1$/g;
const part1 = (file: string): number => {
  const content = readFile(file);
  const ranges = content.map(parseLine);
  let counter = 0;
  for (const range of ranges) {
    for (let num = range.start; num <= range.finish; num++) {
      const strNum = String(num);
      if (strNum.match(singleRepeatedGroup)) {
        counter += num;
      }
    }
  }

  return counter;
};

const multipleRepeatedGroup = /^(.+)\1+$/g;
const part2 = (file: string): number => {
  const content = readFile(file);
  const ranges = content.map(parseLine);
  let counter = 0;
  for (const range of ranges) {
    for (let num = range.start; num <= range.finish; num++) {
      const strNum = String(num);
      if (strNum.match(multipleRepeatedGroup)) {
        counter += num;
      }
    }
  }

  return counter;
};

export default () => {
  const testAnswer1 = part1("./src/input/02.test.txt");
  if (testAnswer1 === 1227775554) {
    console.log("Part 1 Answer:", part1("./src/input/02.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/02.test.txt");
  if (testAnswer2 === 4174379265) {
    console.log("Part 2 Answer:", part2("./src/input/02.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
