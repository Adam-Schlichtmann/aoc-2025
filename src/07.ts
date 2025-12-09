import { readFileSync } from "fs";

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const part1 = (file: string): number => {
  const lines = readFile(file);
  let splits = 0;
  const beams: Set<number> = new Set([lines[0].indexOf("S")]);
  for (let i = 1; i < lines.length; i++) {
    for (const beam of beams) {
      if (lines[i][beam] === "^") {
        beams.delete(beam);
        beams.add(beam - 1);
        beams.add(beam + 1);
        splits++;
      } else {
        beams.add(beam);
      }
    }
  }

  return splits;
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  const chars: (number | string)[][] = lines.map((l) => l.split(""));

  const processParticle = (beam: number, level: number): number => {
    if (level === chars.length) {
      return 1;
    }
    if (typeof chars[level][beam] !== "number") {
      if (chars[level][beam] === "^") {
        chars[level][beam] =
          processParticle(beam - 1, level + 1) +
          processParticle(beam + 1, level + 1);
      } else {
        chars[level][beam] = processParticle(beam, level + 1);
      }
    }
    return chars[level][beam];
  };
  return processParticle(chars[0].indexOf("S"), 1);
};

export default () => {
  const testAnswer1 = part1("./src/input/07.test.txt");
  if (testAnswer1 === 21) {
    console.log("Part 1 Answer:", part1("./src/input/07.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/07.test.txt");
  if (testAnswer2 === 40) {
    console.log("Part 2 Answer:", part2("./src/input/07.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
