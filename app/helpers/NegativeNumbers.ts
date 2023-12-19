import { Operation } from "../page";

// функция для установки отрицательного числа
export const NegativeNumbers = (operator: Operation, numberFirst: string, numberSecond: string): string => {
  if (operator === null) {
    return numberFirst.includes('-') ? numberFirst.replace(/-/g, '') : `-${numberFirst}`
    // setNumberFirst((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
  } else {
    return numberSecond.includes('-') ? numberSecond.replace(/-/g, '') : `-${numberSecond}`
    // setNumberSecond((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
  }
};
