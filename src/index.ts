import { evaluate } from "./eval";
import {
  Code,
  Operator,
  UnknownOperatorException,
  UnmatchedClosingBracketException,
  UnmatchedOpeningBracketException,
} from "./types";

function opsMatch(a: Operator, b: Operator): boolean {
  return a.kind == b.kind;
}

function symbolToOp(symbol: string): Operator {
  switch (symbol) {
    case "+":
      return { kind: "Add", value: 1 };
    case "-":
      return { kind: "Add", value: -1 };
    case ">":
      return { kind: "Move", value: 1 };
    case "<":
      return { kind: "Move", value: -1 };
    case ",":
      return { kind: "Input" };
    case ".":
      return { kind: "Output" };
    default:
      throw new UnknownOperatorException(symbol);
  }
}

function parse(s: string): Code {
  const result: Code = [];

  const innerHelper = (result: Code) => {
    while (s) {
      const symbol = s[0];
      s = s.substring(1);

      switch (symbol) {
        case "+":
        case "-":
        case "<":
        case ">":
          {
            const op = symbolToOp(symbol);
            const lastOp = result.at(-1);

            if (lastOp && opsMatch(op, lastOp)) {
              if (lastOp.kind != "Add" && lastOp.kind != "Move")
                throw new Error("Unreachable");
              if (op.kind != "Add" && op.kind != "Move")
                throw new Error("Unreachable");

              lastOp.value += op.value;
            } else {
              result.push(op);
            }
          }

          break;
        case ",":
        case ".":
          result.push(symbolToOp(symbol));
          break;

        case "[":
          {
            let caught = false;
            const loopCode: Code = [];

            try {
              innerHelper(loopCode);
            } catch (e) {
              if (e instanceof UnmatchedClosingBracketException) {
                caught = true;
              } else {
                throw e;
              }
            }

            if (!caught) {
              throw new UnmatchedOpeningBracketException();
            }

            result.push({ kind: "Loop", code: loopCode });
          }
          break;

        case "]":
          throw new UnmatchedClosingBracketException();
        default:
          break;
      }
    }
  };

  innerHelper(result);

  return result;
}

function main() {
  const parsed = parse(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  );
  console.log(evaluate(parsed));
}

main();
