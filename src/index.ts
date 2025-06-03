import {evaluate} from "./eval";
import {parse} from "./parse";

function main() {
  const parsed = parse(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  );
  console.log(evaluate(parsed));
}

main();
