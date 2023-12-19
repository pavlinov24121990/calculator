import { equals } from '../helpers/equals';

describe('equals function', () => {
  it('should return the correct result for addition', () => {
    const { result, error } = equals('+', '3', '5');
    expect(result).toBe('8');
    expect(error).toBeNull();
  });

  it('should return an error for division by zero', () => {
    const { result, error } = equals('÷', '10', '0');
    expect(result).toBe('');
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Деление на ноль невозможно');
  });

  it('should return an error for an unknown operator', () => {
    const { result, error } = equals('%', '5', '3');
    expect(result).toBe('');
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Неизвестный оператор');
  });

  it('should return the result with correct formatting', () => {
    const { result, error } = equals('+', '1.5', '2.6');
    expect(result).toBe('4‚1');
    expect(error).toBeNull();
  });

  it('should return an empty string for missing data', () => {
    const { result, error } = equals(null, '', '');
    expect(result).toBe('');
    expect(error).toBeNull();
  });
});
