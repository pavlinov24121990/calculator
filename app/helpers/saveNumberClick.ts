import { Operation } from "../page";

// функция записывает в стейт первое и второе число с валидацией
const validateNumber = ["0", '1', '2', '3', "4", "5", "6", "7", "8", "9", "-"];

export const saveNumberClick = (number: string, numberFirst: string, numberSecond: string, operator: Operation): string => {
  const isValidNumber = ((operator ? numberSecond : numberFirst)).split('').every((char: string) => validateNumber.includes(char));
  const updatedNumber = /^-?0$/.test(operator ? numberSecond : numberFirst) && isValidNumber && number !== "," ? (operator ? numberSecond : numberFirst).replace('0', "") : (operator ? numberSecond : numberFirst);
  return updatedNumber + number.replace('‚', '.');
};
