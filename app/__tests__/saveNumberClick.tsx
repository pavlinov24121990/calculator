import { Operation } from '../page';
import { saveNumberClick } from '../helpers/saveNumberClick';

describe('saveNumberClick function', () => {
  const numberFirst = '12';
  const numberSecond = '34';
  const operator: Operation = '+';

  it('should save a valid number to the first number when operator is null', () => {
    const result = saveNumberClick('5', numberFirst, numberSecond, null);
    expect(result).toBe('125');
  });

  it('should save a valid number to the second number when operator is not null', () => {
    const result = saveNumberClick('7', numberFirst, numberSecond, operator);
    expect(result).toBe('347');
  });

  it('should handle commas as decimal separators in the input number', () => {
    const result = saveNumberClick('6‚5', numberFirst, numberSecond, null);
    expect(result).toBe('126.5');
  });

  it('should handle special characters as decimal separators in the input number', () => {
    const result = saveNumberClick('9‚8', numberFirst, numberSecond, operator);
    expect(result).toBe('349.8');
  });

  it('should handle zero as the first number when operator is null and the input number is not a comma', () => {
    const result = saveNumberClick('0', '0', '45', null);
    expect(result).toBe('0');
  });

  it('should not remove zero when the input number is a comma', () => {
    const result = saveNumberClick('0', '123', '0', operator);
    expect(result).toBe('0');
  });

  it('should handle negative numbers in the input number', () => {
    const result = saveNumberClick('-2', numberFirst, numberSecond, null);
    expect(result).toBe('12-2');
  });
});
