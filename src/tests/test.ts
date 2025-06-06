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

test('Nested loop: Double value in cell 1', () => {
  const ast = parse('++[>++<-]>.');
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[1]).toBe(4);

test('Clear cell using loop: [->-<]', () => {
  const ast = parse('++++++[->-<]');
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[0]).toBe(0);
});

test('Zero value output: . should output null character', () => {
  const ast = parse('.');
  const output = evaluate(ast);
  expect(output).toBe('\x00'); // ASCII 0 (null character)
});     
