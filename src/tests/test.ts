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
});

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

test('Pointer movement: >+<+.', () => {
  const ast = parse('>+<+.');
  const buffer = new Array(10).fill(0);
  const output = evaluate(ast, buffer);
  expect(buffer[0]).toBe(1);
  expect(buffer[1]).toBe(1);
  expect(output).toBe('\x01'); // ASCII 1
});

test('Empty program returns empty output', () => {
  const ast = parse('');
  const output = evaluate(ast);
  expect(output).toBe('');
});

test('Comments or invalid characters are ignored', () => {
  const ast = parse('This is a comment++++.');
  const output = evaluate(ast);
  expect(output).toBe('\x04');
});

test('Unmatched brackets should throw error', () => {
  expect(() => parse('[++')).toThrow();
  expect(() => parse('++]')).toThrow();
});

test('Large loop decrements to zero', () => {
  const ast = parse('++++++++++[->-<]');
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[0]).toBe(0);
});

test('Output multiple characters: +.+.+.', () => {
  const ast = parse('+.+.+.');
  const output = evaluate(ast);
  expect(output).toBe('\x01\x02\x03');
});

test('Multiply: Copy 3 into cell 1 three times to make 9', () => {
  const ast = parse('+++[>+++<-]'); // 3 * 3 -> cell 1 = 9
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[1]).toBe(9);
});

test('Nested loop to square a number: 3^2 = 9', () => {
  const ast = parse('+++[>+++[>+<-]<-]>>');
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[2]).toBe(9);
});

test('Memory overflow: >>>>>>>>>>>>>+ should stay in bounds', () => {
  const ast = parse('>>>>>>>>>>>+');
  const buffer = new Array(12).fill(0);
  evaluate(ast, buffer);
  expect(buffer[11]).toBe(1);
});

test('Clear cell via subtraction loop', () => {
  const ast = parse('++++++[->------<]');
  const buffer = new Array(10).fill(0);
  evaluate(ast, buffer);
  expect(buffer[0]).toBe(0);
});
