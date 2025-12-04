import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const banks = content.split("\n").filter(Boolean);
  return banks;
};

const parseLine = (range: string) => {
  return range.trim().split("");
};

const getBiggestBattery = (
  bank: string[],
  // remainging digits to be selected
  remaining: number
): string => {
  const sorted = bank
    // Cannot select something too close to the end of the bank +1 since 1 is base case
    .slice(0, bank.length - remaining + 1)
    .sort((a, b) => (a < b ? 1 : -1));

  const biggest = sorted[0];
  if (remaining === 1) {
    return biggest;
  }
  const biggestIndex = bank.findIndex((v) => v === biggest);
  return (
    biggest + getBiggestBattery(bank.slice(biggestIndex + 1), remaining - 1)
  );
};

const part1 = (file: string): number => {
  const banks = readFile(file);
  let count = 0;
  for (const bank of banks) {
    const biggestBattery = getBiggestBattery(parseLine(bank), 2);
    count += Number(biggestBattery);
  }

  return count;
};

const part2 = (file: string): number => {
  const banks = readFile(file);
  let count = 0;
  for (const bank of banks) {
    const biggestBattery = getBiggestBattery(parseLine(bank), 12);
    count += Number(biggestBattery);
  }

  return count;
};

export default () => {
  const testAnswer1 = part1("./src/input/03.test.txt");
  if (testAnswer1 === 357) {
    console.log("Part 1 Answer:", part1("./src/input/03.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/03.test.txt");
  if (testAnswer2 === 3121910778619) {
    console.log("Part 2 Answer:", part2("./src/input/03.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
