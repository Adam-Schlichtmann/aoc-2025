import { readFileSync } from "fs";

const computePath = (nodes: number[]) => {
  let value = 0;

  for (const node of nodes) {
    console.log(
      "Status",
      visualizeNumber(value),
      "->",
      visualizeNumber(node),
      "(",
      node,
      ")"
    );
    value = value ^ node;
  }
  console.log("End   ", visualizeNumber(value));
  return value;
};

const visualizeNumber = (n: number) =>
  n.toString(2).padStart(8, "0").replaceAll("1", "#").replaceAll("0", ".");

const stateRegex = /\[.+\]/;
const buttonRegex = /\(.+?\)/g;
const joltageRegex = /\{.+\}/;

class Machine {
  public desiredState: number;
  public buttons: number[] = [];
  public joltage: number[];
  public buttonCombinations: number[][] = [];

  constructor(line: string) {
    const state = line.match(stateRegex);
    if (state && state.length) {
      this.desiredState = Number.parseInt(
        state[0]
          .substring(1, state[0].length - 1)
          .replaceAll("#", "1")
          .replaceAll(".", "0")
          .split("")
          .reverse()
          .join(""),
        2
      );
    } else {
      this.desiredState = -10000;
      throw new Error("NO DESIRED STATE");
    }
    const buttons = line.match(buttonRegex);
    if (buttons && buttons.length) {
      for (const button of buttons) {
        this.buttons.push(
          Number(
            button
              .substring(1, button.length - 1)
              .split(",")
              .reduce((acc, item) => acc + 2 ** Number(item), 0)
          )
        );
      }
    } else {
      throw new Error("NO BUTTONS");
    }

    const joltage = line.match(joltageRegex);
    if (joltage && joltage.length) {
      this.joltage = joltage[0]
        .substring(1, joltage[0].length - 1)
        .split(",")
        .map(Number);
    } else {
      this.joltage = [];
      throw new Error("NO JOLTAGE");
    }
    this.getCombinations();
  }

  public print() {
    console.log(
      "Desired State:",
      this.desiredState,
      this.desiredState.toString(2).padStart(8, "0")
    );
    console.log(
      "Buttons:\n |",
      this.buttons
        .map(
          (n) =>
            `${n.toString().padStart(3, " ")} -> ${n
              .toString(2)
              .padStart(8, "0")}`
        )
        .join("\n | ")
    );
    console.log("Joltage:", this.joltage);
  }

  getCombinations() {
    const result: number[][] = [];

    const generate = (idx: number, path: number[]) => {
      if (idx === this.buttons.length) {
        result.push(path);
      } else {
        generate(idx + 1, [...path]);
        generate(idx + 1, [...path, this.buttons[idx]]);
      }
    };

    generate(0, []);
    this.buttonCombinations = result.sort((a, b) => a.length - b.length);
  }
}

const readFile = (file: string) => {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  return lines;
};

const part1 = (file: string): number => {
  const lines = readFile(file);
  const machines = lines.map((l) => new Machine(l));

  const results = machines.map((m, i) => {
    for (const path of m.buttonCombinations) {
      if (computePath(path) === m.desiredState) {
        return path.length;
      }
    }
    return -1;
  });

  return results.reduce((acc, item) => acc + item);
};

const part2 = (file: string): number => {
  const lines = readFile(file);
  return 0;
};

export default () => {
  const testAnswer1 = part1("./src/input/10.test.txt");
  if (testAnswer1 === 7) {
    console.log("Part 1 Answer:", part1("./src/input/10.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 1 failed to pass test input. Got",
      testAnswer1
    );
  }
  const testAnswer2 = part2("./src/input/10.test.txt");
  if (testAnswer2 === 33) {
    console.log("Part 2 Answer:", part2("./src/input/10.txt"));
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Part 2 failed to pass test input. Got",
      testAnswer2
    );
  }
};
