'use client'
import { useEffect, useState } from 'react';
import { safeMRNumber } from './helpers/safeMRNumber';
import { NegativeNumbers } from './helpers/NegativeNumbers'
import { interestCalculation } from './helpers/interestCalculation';
import { saveNumberClick } from './helpers/saveNumberClick';
import { equals } from './helpers/equals';

// назначение типов TS, создание масивов
export type Operation = "+" | "—" | "x" | "÷" | "%" | null;
type MR = "MR" | "MR+" | "MR-" | null;
const MRs = ["MR", "MR+", "MR-"];
const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","]
const operators = ["÷", "x", "—", "+"];

const Сalculator: React.FC = () => {

  // создание стейтов с определением типа и дефолтного значения
  const [numberFirst, setNumberFirst] = useState<string>("0")
  const [numberSecond, setNumberSecond] = useState<string>("0")
  const [answer, setAnswer] = useState<string | Operation>(numberFirst)
  const [answerTwo, setAnswerTwo] = useState<boolean>(false)
  const [operator, setOperator] = useState<Operation>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [reset, setReset] = useState<string>("AC");
  const [safeNumbers, setSafeNumbers] = useState<number[]>([]);
  const [errors, setErrors] = useState<string>("");

// функция запоминание чисел - производит расчёты, очищает стейты, записывает результаты
  function calculateMR(operatorMR: string, safeNumbers: number[]): void {
    switch (operatorMR) {
      case "MR":
        setSafeNumbers(safeMRNumber(answer, safeNumbers))
        clearAllState()
        break;
      case "MR+":
        if (safeNumbers.length < 2) {
          setErrors("Для операции MR+ требуется как минимум два числа")
        }
          const result = safeNumbers.reduce((sum, num) => sum + num).toString()
          setNumberFirst(result)
          setSafeNumbers([])
        break;
      case "MR-":
        if (safeNumbers.length < 2) {
          setErrors("Для операции MR- требуется как минимум два числа")
          throw new Error("Для операции MR- требуется как минимум два числа");
        }
        const results = safeNumbers.reduce((result, num) => result - num).toString()
        setNumberFirst(results)
        setSafeNumbers([])
        break;
      default:
      throw new Error("Неизвестный оператор");
    }
  };

  const equalsClick = (): void => {
    setActiveButton(null);
    const { result, error } = equals(operator, numberFirst, numberSecond);
      if (result && !error) {
        setNumberSecond("0");
        setNumberFirst(result);
        setErrors("");
        setOperator(null);
        setAnswerTwo(true)
      } else {
      setErrors(error?.message || "")
      }
  }

  const validOperator = (operator: Operation): void => {
    if (operator != null) {
      equalsClick()
    }
  }
  
  // Хук обновляет значение стейтов для своевременного отображение на экране + меняет . на , для корретного отображения
  useEffect(() => {
    setAnswer((operator ? (answerTwo ? numberFirst : numberSecond) : numberFirst).replace('.', '‚'));
  }, [numberFirst, numberSecond, operator]);

// функция очистки стейтов (зброс калькулятора)
  const clearAllState = (): void => {
    setNumberFirst("0")
    setAnswer(numberFirst)
    setNumberSecond("0")
    setOperator(null)
    setReset("AC")
    setErrors("")
    setAnswerTwo(false)
  };

// HTML код
  return (
    <main>
      <div className={errors ? "errors display" : "display"}>
        {errors ? <span className='errors'>{errors}</span> : answer}
      </div>
      <div className='main-conteiner'>
        <div className="panel-conteiner">
          <ul>
            {MRs.map((MR) => (
              <li key={MR}>
                <button className='button-panel' onClick={() => { setAnswerTwo(false); calculateMR(MR ?? "" as MR, safeNumbers) }}>{MR}</button>
              </li>
            ))}
            <li><button className='button-panel' onClick={() => { clearAllState(); setActiveButton(null); setSafeNumbers([]) }}>{reset}</button></li>
            <li>
              <button onClick={() => { setAnswerTwo(false); (operator ? setNumberSecond : setNumberFirst)(`${NegativeNumbers(operator, numberFirst, numberSecond)}`) }} className='button-panel'>
                <span>+</span>
                <span>/</span>
                <span>-</span>
              </button>
            </li>
            <li><button onClick={() => {setAnswerTwo(false); (operator ? setNumberSecond : setNumberFirst)(`${interestCalculation(operator, numberFirst, numberSecond)}`)}} className='button-panel'>%</button></li>
            {numbers.map((number) => (
              <li key={number}>
                <button className='button-panel' onClick={() => { setAnswerTwo(false); (operator ? setNumberSecond : setNumberFirst)(`${saveNumberClick(number, numberFirst, numberSecond, operator)}`); setActiveButton(null); operator ?? setReset("C"); }}>{number}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="operator-container">
          <ul>
            {operators.map((operator) => (
              <li key={operator}>
                <button className={activeButton === operator ? "active button-operator" : "button-operator"} onClick={() => { setAnswerTwo(false); validOperator(operator as Operation); setOperator(operator as Operation); setActiveButton(operator); }}>{operator}</button>
              </li>
            ))}
            <li>
              <button className="button-operator" onClick={() => {
                setActiveButton(null);
                equalsClick()
              }}>=</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Сalculator;
