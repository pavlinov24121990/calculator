import { Operation } from "../page";
// функция запоминание чисел - сохраняет числа в стейт массив МR
export const safeMRNumber = (answer: string | Operation, safeNumbers: number[]): number[] => {
  return answer ? [...safeNumbers, parseFloat(answer.replace(',', '.'))] : safeNumbers
};
