import { Operation } from "../page";

// функция производит расчёты числе с операторами (+, -, *, /)
export function calculate(operator: Operation, numberFirst: number, numberSecond: number): number {
  switch (operator) {
    case "+":
      return numberFirst + numberSecond;
    case "—":
      return numberFirst - numberSecond;
    case "x":
      return numberFirst * numberSecond;
    case "÷":
      if (numberSecond !== 0) {
          return numberFirst / numberSecond;
      } else {
          throw new Error("Деление на ноль невозможно");
      }
      default:
      throw new Error("Неизвестный оператор");
  }
};
