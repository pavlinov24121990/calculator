import { calculate } from '../helpers/calculate';

describe('calculate function', () => {
  it('should add two numbers', () => {
    expect(calculate('+', 3, 5)).toBe(8);
  });

  it('should subtract two numbers', () => {
    expect(calculate('—', 10, 4)).toBe(6);
  });

  it('should multiply two numbers', () => {
    expect(calculate('x', 2, 6)).toBe(12);
  });

  it('should divide two numbers', () => {
    expect(calculate('÷', 8, 2)).toBe(4);
  });

  it('should throw an error for division by zero', () => {
    expect(() => calculate('÷', 10, 0)).toThrow('Деление на ноль невозможно');
  });

  it('should throw an error for unknown operator', () => {
    expect(() => calculate('%', 5, 3)).toThrow('Неизвестный оператор');
  });
});
