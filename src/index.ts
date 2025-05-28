// Exceptions

class UnknownOperatorException {
    symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }
}

class UnmatchedOpeningBracketException {
}

class UnmatchedClosingBracketException {
}


// Types

type Code = Operator[];

type Operator =
    | { kind: "Loop", code: Code }
    | { kind: "Add", value: number }
    | { kind: "Move", value: number }
    | { kind: "Input" }
    | { kind: "Output" };

// Functions

function opsMatch(a: Operator, b: Operator): boolean {
    return a.kind == b.kind;
}

function symbolToOp(symbol: string): Operator {
    switch (symbol) {
        case "+":
            return {kind: "Add", value: 1};
        case "-":
            return {kind: "Add", value: -1};
        case ">":
            return {kind: "Move", value: 1};
        case "<":
            return {kind: "Move", value: -1};
        case ",":
            return {kind: "Input"};
        case ".":
            return {kind: "Output"};
        default:
            throw new UnknownOperatorException(symbol);
    }
}

function printCode(code: Code, tabulation: number = 0) {
    for(const op of code) {
        if (op.kind != "Loop") {
            let s = JSON.stringify(op)
            for (let i = 0; i < tabulation; ++i) s = " " + s
            console.log(s)
        } else {
            printCode(op.code, tabulation + 4);
        }
    }
}

function parse(s: string): Code {
    const result: Code = [];

    function innerHelper(result: Code) {
        while (s) {
            let symbol = s[0];
            s = s.substring(1);

            switch (symbol) {
                case "+":
                case "-":
                case "<":
                case ">":
                    let op = symbolToOp(symbol);
                    let lastOp = result.at(-1)

                    if (lastOp && opsMatch(op, lastOp)) {
                        if (lastOp.kind != "Add" && lastOp.kind != "Move") throw new Error("Unreachable");
                        if (op.kind != "Add" && op.kind != "Move") throw new Error("Unreachable");

                        lastOp.value += op.value;
                    } else {
                        result.push(op);
                    }

                    break;
                case ",":
                case ".":
                    result.push(symbolToOp(symbol));
                    break;

                case "[":
                    let caught = false;
                    const loopCode: Code = []

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
                        throw new UnmatchedOpeningBracketException()
                    }

                    result.push({ kind: "Loop", code: loopCode });
                    break;

                case "]":
                    throw new UnmatchedClosingBracketException()
                default:
                    break;
            }
        }

    }

    innerHelper(result);

    return result;
}

function main() {
    printCode(parse("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++."))
}

main()
