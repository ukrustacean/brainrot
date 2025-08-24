class UnknownOperatorException {
    symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }
}

export type Ast = AstNode[];

export type AstNode =
    | { kind: "Loop"; code: Ast }
    | { kind: "Add"; value: number }
    | { kind: "Move"; value: number }
    | { kind: "Input" }
    | { kind: "Output" };

export function assertValue(node: AstNode): asserts node is { kind: "Add" | "Move"; value: number } {
    if (node.kind != "Move" && node.kind != "Add") {
        throw new Error("Unreachable");
    }
}

export function areOfSameKind(a: AstNode, b: AstNode): boolean {
    return a.kind == b.kind;
}

export function symbolToNode(symbol: string): AstNode {
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
