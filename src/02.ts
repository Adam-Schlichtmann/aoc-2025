import { readFileSync } from "fs";

const readFile = () => {
  const content = readFileSync("./src/input/02.txt", "utf-8");
  const ranges = content.split(",").filter(Boolean);
  return ranges;
};

const parseLine = (range: string) => {
  const [start, finish] = range.split("-");
  return { start: Number(start), finish: Number(finish) };
};

const singleRepeatedGroup = /^(.+)\1$/g;
const part1 = () => {
  const content = readFile();
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
  console.log("Result:", counter);
};

const multipleRepeatedGroup = /^(.+)\1+$/g;
const part2 = () => {
  const content = readFile();
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
  console.log("Result:", counter);
};

export default () => {
  part1();
  part2();
};
