import { readFileSync } from "fs";
import { program } from "commander";

import { evaluate } from "./eval";
import { parse } from "./parse";

function main() {
  program
    .name("brainrot")
    .description(
      "Simple and minimalist Brainf*ck interpreter with very basic optimisation",
    )
    .version("1.0.0")
    .argument("[FILE]", "path to the file to read Brainf*ck program from")
    .option(
      "-e, --expr [EXPRESSION]",
      "evaluate a single-string program in Brainf*ck",
    );

  program.parse();

  const filename: string | undefined = program.args[0];
  const expression: string | undefined = program.opts().expr;

  if (!filename && !expression) {
    program.error(
      "Neither file nor expression for evaluation were specified\n" +
        "TIP: use --help to see available options",
      {
        exitCode: 1,
      },
    );
  }

  if (filename && expression) {
    program.error(
      "Both file and expression for evaluation were specified\n" +
        "TIP: you can only specify a single code source",
      {
        exitCode: 1,
      },
    );
  }

  let code = "";

  if (filename) {
    try {
      code = readFileSync(filename, "utf8");
    } catch {
      program.error(`${filename}: No such file or directory`, {
        exitCode: 1,
      });
    }
  }

  if (expression) {
    code = expression;
  }

  const parsed = parse(code);
  console.log(evaluate(parsed));
}

main();
