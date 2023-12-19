import { safeMRNumber } from '../helpers/safeMRNumber';

describe('safeMRNumber function', () => {
  it('should add a new number to the array when answer is provided', () => {
    const result = safeMRNumber('25', [10, 15]);
    expect(result).toEqual([10, 15, 25]);
  });

  it('should handle commas as decimal separators in the answer', () => {
    const result = safeMRNumber('25,5', [10, 15]);
    expect(result).toEqual([10, 15, 25.5]);
  });

  it('should not add a new number to the array when answer is not provided', () => {
    const result = safeMRNumber(null, [10, 15]);
    expect(result).toEqual([10, 15]);
  });

  it('should handle an empty array', () => {
    const result = safeMRNumber('25', []);
    expect(result).toEqual([25]);
  });

  it('should handle zero as the answer', () => {
    const result = safeMRNumber('0', [10, 15]);
    expect(result).toEqual([10, 15, 0]);
  });

  it('should handle negative numbers as the answer', () => {
    const result = safeMRNumber('-25', [10, 15]);
    expect(result).toEqual([10, 15, -25]);
  });

  it('should handle zero as the answer in an empty array', () => {
    const result = safeMRNumber('0', []);
    expect(result).toEqual([0]);
  });
});
