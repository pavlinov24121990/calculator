import { interestCalculation } from '../helpers/interestCalculation';

describe('interestCalculation function', () => {
  it('should calculate interest with percentage', () => {
    const result = interestCalculation('+', '200', '15');
    expect(result).toBe('30');
  });

  it('should calculate interest without percentage', () => {
    const result = interestCalculation(null, '2000', '10');
    expect(result).toBe('20');
  });

  it('should handle commas as decimal separators', () => {
    const result = interestCalculation('+', '200,5', '12,5');
    expect(result).toBe('25.0625');
  });


  it('should handle zero as the second number', () => {
    const result = interestCalculation('+', '150', '0');
    expect(result).toBe('0');
  });

  it('should handle zero as the first number without operator', () => {
    const result = interestCalculation(null, '0', '15');
    expect(result).toBe('0');
  });

  it('should handle zero as the first number with operator', () => {
    const result = interestCalculation('+', '0', '15');
    expect(result).toBe('0');
  });

  it('should handle negative numbers as the second number', () => {
    const result = interestCalculation('—', '150', '-10');
    expect(result).toBe('-15');
  });

  it('should handle negative numbers as the first number without operator', () => {
    const result = interestCalculation(null, '-200', '10');
    expect(result).toBe('-2');
  });

  it('should handle negative numbers as the first number with operator', () => {
    const result = interestCalculation('—', '-200', '10');
    expect(result).toBe('-20');
  });
});
