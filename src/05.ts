import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n\n").filter(Boolean);
  return lines;
};

type Range = { start: number; end: number };

const parseFresh = (ranges: string): Range[] => {
  const lines = ranges.split("\n").filter(Boolean);
  return lines.map(parseRangeLine);
};

const parseRangeLine = (line: string): Range => {
  const [start, end] = line.split("-");
  return { start: Number(start), end: Number(end) };
};

const parseIngredients = (ingredients: string): number[] => {
  return ingredients.split("\n").filter(Boolean).map(Number);
};

const inRange = (n: number, range: Range) => n >= range.start && n <= range.end;

const collapseRanges = (ranges: Range[]): Range[] => {
  const newRanges: Range[] = [];

  const sortedByStart = ranges.sort((a, b) => {
    if (a.start === b.start) {
      return a.end - b.end;
    }
    return a.start - b.start;
  });
  let i = 0;
  while (i < sortedByStart.length) {
    let j = i + 1;
    let newRange: Range = { ...sortedByStart[i] };
    while (
      j < sortedByStart.length &&
      inRange(sortedByStart[j].start, newRange)
    ) {
      if (newRange.end < sortedByStart[j].end) {
        newRange.end = sortedByStart[j].end;
      }
      j++;
    }

    newRanges.push(newRange);
    i = j;
  }

  return newRanges;
};

const part1 = (file: string): number => {
  const [rawRanges, rawIngredients] = readFile(file);
  const ranges = parseFresh(rawRanges);
  const ingredients = parseIngredients(rawIngredients);
  let count = 0;
  for (const i of ingredients) {
    if (ranges.some((r) => i >= r.start && i <= r.end)) {
      count++;
    }
  }
  return count;
};

const part2 = (file: string): number => {
  const [rawRanges] = readFile(file);
  const ranges = parseFresh(rawRanges);
  const collapsedRanges = collapseRanges(ranges);
  let count = 0;
  for (const range of collapsedRanges) {
    count += range.end - range.start + 1;
  }
  return count;
};

export default () => {
  const testAnswer1 = part1("./src/input/05.test.txt");
  if (testAnswer1 === 3) {
    console.log("Part 1 Answer:", part1("./src/input/05.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/05.test.txt");
  if (testAnswer2 === 14) {
    console.log("Part 2 Answer:", part2("./src/input/05.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
