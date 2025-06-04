import { parse } from '../parse'
import { evaluate } from '../eval'

test('Simple Output: +++++ . should output A', () => {
  const ast = parse('+++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++.');
  const output = evaluate(ast);
  expect(output).toBe('A');
});

test('Hello world output', () => {
  const ast = parse('>+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[<++++>-]<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.>++++++++++.');
  const output = evaluate(ast);
  expect(output).toBe('Hello World!\n');
});

test('Loop: +[>+<-] should copy cell 0 to cell 1', () => {
  const ast = parse('++++++[>+<-]');
  const buffer = new Array(10).fill(0)
  evaluate(ast, buffer);
  expect(buffer[1]).toBe(6);
});
