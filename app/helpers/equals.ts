import { Operation } from "../page";
import { calculate } from "./calculate";

// функция (=) которая вызывает функции для расчёта и обновляет нужные стейты с преобразованием в нужный формат
export const equals = (operator: Operation, numberFirst: string, numberSecond: string): { result: string; error: Error | null } => {
  try {
    if (!operator || !numberFirst || !numberSecond) {
      return { result: "", error: null };
    }

    const parseNumber = (num: string) => parseFloat(num.replace(',', '.'));

    const result = calculate(operator, parseNumber(numberFirst), parseNumber(numberSecond));
    return { result: result.toString().replace('.', '‚'), error: null };
  } catch (error) {
    return { result: "", error: error instanceof Error ? error : new Error("Произошла ошибка") };
  }
};