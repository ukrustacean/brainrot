# Brainrot 🧠

A Brainfuck interpreter written in TypeScript with basic optimizations.

## Features

- AST-based parsing with optimizations for consecutive operations
- Support for both file input and direct expression evaluation
- Memory safety (prevents negative pointer positions)
- Comprehensive test coverage

## Brainfuck Commands

| Command | Description |
|---------|-------------|
| `+` | Increment the memory cell |
| `-` | Decrement the memory cell |
| `>` | Move pointer right |
| `<` | Move pointer left |
| `.` | Output character |
| `,` | Input character |
| `[` | Loop start (skip if cell is 0) |
| `]` | Loop end (repeat if cell is not 0) |

## Installation

```bash
git clone <repository-url>
cd brainrot
npm install
npm run build
```

## Usage

```bash
# Run from file
npm run start <file name>

# Run expression directly
node .\dist\main.js --expr <your expression> or
npm run start -- --expr <your expression>
```

### Project Structure
```
src/
├── ast.ts          # AST definitions
├── parse.ts        # Parser with optimizations
├── eval.ts         # Interpreter
├── main.ts         # CLI interface
└── __tests__/      # Test suite
```