import { NegativeNumbers } from '../helpers/NegativeNumbers';

describe('NegativeNumbers function', () => {
  it('should make the first number negative when operator is null and the first number is positive', () => {
    const result = NegativeNumbers(null, '25', '30');
    expect(result).toBe('-25');
  });

  it('should make the first number positive when operator is null and the first number is negative', () => {
    const result = NegativeNumbers(null, '-25', '30');
    expect(result).toBe('25');
  });

  it('should make the second number negative when operator is not null and the second number is positive', () => {
    const result = NegativeNumbers('+', '25', '30');
    expect(result).toBe('-30');
  });

  it('should make the second number positive when operator is not null and the second number is negative', () => {
    const result = NegativeNumbers('+', '25', '-30');
    expect(result).toBe('30');
  });

  it('should handle commas as decimal separators in the first number', () => {
    const result = NegativeNumbers(null, '25,5', '30');
    expect(result).toBe('-25,5');
  });

  it('should handle commas as decimal separators in the second number', () => {
    const result = NegativeNumbers('+', '25', '30,5');
    expect(result).toBe('-30,5');
  });

  it('should handle special characters as decimal separators in the first number', () => {
    const result = NegativeNumbers(null, '25‚5', '30');
    expect(result).toBe('-25‚5');
  });

  it('should handle special characters as decimal separators in the second number', () => {
    const result = NegativeNumbers('+', '25', '30‚5');
    expect(result).toBe('-30‚5');
  });

  it('should handle zero as the first number when operator is null', () => {
    const result = NegativeNumbers(null, '0', '30');
    expect(result).toBe('-0');
  });

  it('should handle zero as the second number when operator is not null', () => {
    const result = NegativeNumbers('+', '25', '0');
    expect(result).toBe('-0');
  });
});
