import { readFileSync } from "fs";

const readFile = () => {
  const content = readFileSync("./src/input/03.txt", "utf-8");
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

const part1 = () => {
  const banks = readFile();
  let count = 0;
  for (const bank of banks) {
    const biggestBattery = getBiggestBattery(parseLine(bank), 2);
    count += Number(biggestBattery);
  }
  console.log("Results:", count);
};

const part2 = () => {
  const banks = readFile();
  let count = 0;
  for (const bank of banks) {
    const biggestBattery = getBiggestBattery(parseLine(bank), 12);
    count += Number(biggestBattery);
  }
  console.log("Results:", count);
};

export default () => {
  part1();
  part2();
};
