import { Code } from "./types";
import { readSync } from "fs";

function getChar(): number {
  const buffer = Buffer.alloc(1);
  readSync(0, buffer);
  return buffer[0];
}

export function eval(operations: Code, cells: number[] = []): string {
  let pos = 0;
  let result = "";

  const updateCell = (value: number) => {
    cells[pos] = (cells[pos] || 0) + value;
  };

  const moveCell = (value: number) => {
    pos += value;
    if (pos < 0) pos = 0;
  };

  const runOps = (ops: Code) => {
    for (const op of ops) {
      switch (op.kind) {
        case "Add":
          updateCell(op.value);
          break;
        case "Move":
          moveCell(op.value);
          break;
        case "Output":
          result = result.concat(String.fromCharCode(cells[pos] || 0));
          break;
        case "Loop":
          while (cells[pos] !== 0) {
            runOps(op.code);
          }
          break;
        case "Input":
          cells[pos] = getChar();
          break;
      }
    }
  };
  runOps(operations);

  return result;
}
