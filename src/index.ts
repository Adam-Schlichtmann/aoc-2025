import day01 from "./01.ts";
import day02 from "./02.ts";
import day03 from "./03.ts";
import day04 from "./04.ts";
import day05 from "./05.ts";
import day06 from "./06.ts";
import day07 from "./07.ts";
import day08 from "./08.ts";
import day09 from "./09.ts";
import day10 from "./10.ts";
import day11 from "./11.ts";
import day12 from "./12.ts";

const day = Number(process.argv[2]);
if (Number.isNaN(day)) {
  console.log("Invalid Day Number");
  process.exit(1);
}

if (day < 1 || day > 12) {
  console.log("Day out of range");
  process.exit(1);
}

console.log(`----- Running Day ${day} -----`);

switch (day) {
  case 1:
    day01();
    break;
  case 2:
    day02();
    break;
  case 3:
    day03();
    break;
  case 4:
    day04();
    break;
  case 5:
    day05();
    break;
  case 6:
    day06();
    break;
  case 7:
    day07();
    break;
  case 8:
    day08();
    break;
  case 9:
    day09();
    break;
  case 10:
    day10();
    break;
  case 11:
    day11();
    break;
  case 12:
    day12();
    break;
  default:
    console.log("Error: Unknown Day");
}
