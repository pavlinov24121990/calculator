import { Operation } from "../page";

// функция производит расчёты числе с процентами
export const interestCalculation = (operator: Operation, numberFirst: string, numberSecond: string): string => {
  return operator ? (parseFloat(numberFirst.replace(',', '.')) * (parseFloat(numberSecond.replace(',', '.')) / 100)).toString() : (parseFloat(numberFirst.replace('‚', '.')) / 100).toString()
};
