import { Operation } from "../page";

// функция для установки отрицательного числа
export const NegativeNumbers = (operator: Operation, numberFirst: string, numberSecond: string): string => {
  if (operator === null) {
    return numberFirst.includes('-') ? numberFirst.replace(/-/g, '') : `-${numberFirst}`
  } else {
    return numberSecond.includes('-') ? numberSecond.replace(/-/g, '') : `-${numberSecond}`
  }
};
