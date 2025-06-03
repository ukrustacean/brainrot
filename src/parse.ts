import { areOfSameKind, Ast, symbolToNode } from "./ast";

class UnmatchedOpeningBracketException {}

class UnmatchedClosingBracketException {}

export function parse(s: string): Ast {
  const result: Ast = [];

  const innerHelper = (result: Ast) => {
    while (s) {
      const symbol = s[0];
      s = s.substring(1);

      switch (symbol) {
        case "+":
        case "-":
        case "<":
        case ">":
          {
            const node = symbolToNode(symbol);
            const lastNode = result.at(-1);

            if (lastNode && areOfSameKind(node, lastNode)) {
              if (lastNode.kind != "Add" && lastNode.kind != "Move")
                throw new Error("Unreachable");
              if (node.kind != "Add" && node.kind != "Move")
                throw new Error("Unreachable");

              lastNode.value += node.value;
            } else {
              result.push(node);
            }
          }

          break;
        case ",":
        case ".":
          result.push(symbolToNode(symbol));
          break;

        case "[":
          {
            let caught = false;
            const innerAst: Ast = [];

            try {
              innerHelper(innerAst);
            } catch (e) {
              if (e instanceof UnmatchedClosingBracketException) caught = true;
              else throw e;
            }

            if (!caught) {
              throw new UnmatchedOpeningBracketException();
            }

            result.push({ kind: "Loop", code: innerAst });
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
