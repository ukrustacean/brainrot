// Exceptions

export class UnknownOperatorException {
  symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }
}

export class UnmatchedOpeningBracketException {}

export class UnmatchedClosingBracketException {}

// Types

export type Code = Operator[];

export type Operator =
  | { kind: "Loop"; code: Code }
  | { kind: "Add"; value: number }
  | { kind: "Move"; value: number }
  | { kind: "Input" }
  | { kind: "Output" };
