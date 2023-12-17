'use client'
import { useEffect, useState } from 'react';

type Operation = "+" | "—" | "x" | "÷" | "%" | null;
type MR = "MR" | "MR+" | "MR-" | null

const Home: React.FC = () => {
  const [number1, setNumber1] = useState<string>("0")
  const [number2, setNumber2] = useState<string>("0")
  const [answer, setAnswer] = useState<string | Operation>(number1)
  const [operator, setOperator] = useState<Operation>(null);
  const [percent, setPercent] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [reset, setReset] = useState<string>("AC");
  const [safeNumbers, setSafeNumbers] = useState<number[]>([]);

  const safeMRNumber = (): void => {
    setSafeNumbers((prevNumbers) => answer ? [...prevNumbers, parseFloat(answer.replace(',', '.'))] : [...prevNumbers, 0]);
  };

  function calculateMR(operatorMR: string, safeNumbers: number[]): void {
    switch (operatorMR) {
      case "MR":
        safeMRNumber()
        clearAllState()
        break;
      case "MR+":
        const result = safeNumbers.reduce((sum, num) => sum + num).toString()
        setNumber1(result)
        setSafeNumbers([])
        break;
      case "MR-":
        if (safeNumbers.length < 2) {
          throw new Error("Для операции MR- требуется как минимум два числа");
        }
        const results = safeNumbers.reduce((result, num) => result - num).toString()
        setNumber1(results)
        setSafeNumbers([])
        break;
      default:
      throw new Error("Неизвестный оператор");
    }
  };

  const handleButtonClick = (button: string | null): void => {
    setActiveButton(button);
  };

  const NegativeNumbers = (): void => {
    if (operator === null) {
      setNumber1((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
    } else {
      setNumber2((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
    }
  };

  const interestCalculation = (operator: Operation, number1: number, number2: number): number => {
    switch (operator) {
      case "+":
        return number1 + (number1 * (number2 / 100));
      case "—":
        return number1 - (number1 * (number2 / 100));
      case "x":
        return number1 * (number1 * (number2 / 100));
      case "÷":
        return number1 / (number1 * (number2 / 100));
      default:
        throw new Error("Неизвестный оператор");
    }
  };

  function calculate(operator: Operation, number1: number, number2: number): number {
    switch (operator) {
      case "+":
        return number1 + number2;
      case "—":
        return number1 - number2;
      case "x":
        return number1 * number2;
      case "÷":
        if (number2 !== 0) {
            return number1 / number2;
        } else {
            throw new Error("Деление на ноль невозможно");
        }
        default:
        throw new Error("Неизвестный оператор");
    }
  };
  
  const saveNumberClick = (number: string): void => {
    const validateNumber = ["0", '1', '2', '3', "4", "5", "6", "7", "8", "9", "-"]
    if (operator === null) {
      setNumber1((prevNumber) => {
        const isValidNumber = prevNumber.split('').every((char) => validateNumber.includes(char));
        const updatedNumber = /^-?0$/.test(prevNumber) && isValidNumber && number !== "," ? prevNumber.replace('0', "") : prevNumber;
        return updatedNumber + number.replace('‚', '.');
      });
      setReset("C");
    } else {
      setNumber2((prevNumber) => {
        const isValidNumber = prevNumber.split('').every((char) => validateNumber.includes(char));
        const updatedNumber = /^-?0$/.test(prevNumber) && isValidNumber && number !== "," ? prevNumber.replace('0', "") : prevNumber;
        return updatedNumber + number.replace('‚', '.');
      });
    }
  };
  useEffect(() => {
    if (operator === null) {
      setAnswer(number1.replace('.', '‚'));
    } else {
      setAnswer(number2.replace('.', '‚'))
    }
  }, [number1, number2]);

  const saveOperatorClick = (operator: Operation): void => {
    setOperator(operator)
  };

  const clearAllState = (): void => {
    setNumber1("0")
    setAnswer(number1)
    setNumber2("0")
    setOperator(null)
    setPercent(false)
    setReset("AC")
  };

  const equals = (percent: boolean, operator: Operation, number1: string, number2: string): void => {
    try {
      if (!operator || !number1 || !number2) {
        return;
      }

      const parseNumber = (num: string) => parseFloat(num.replace(',', '.'));

      const result = percent
        ? interestCalculation(operator, parseNumber(number1), parseNumber(number2))
        : calculate(operator, parseNumber(number1), parseNumber(number2));
      
      setNumber1(result.toString().replace('.', '‚'));
      setNumber2("0");
      setOperator(null);
      setPercent(false);
    } catch (error) {
      console.error('Ошибка');
    }
  };

  return (
    <main>
      <div className="display">
        {answer}
      </div>
      <div className='main-conteiner'>
        <div className="panel-conteiner">
          <ul>
            {["MR", "MR+", "MR-"].map((MR) => (
              <li key={MR}>
                <button className='button-panel' onClick={() => calculateMR(MR ?? "" as MR, safeNumbers)}>{MR}</button>
              </li>
            ))}
            <li><button className='button-panel' onClick={() => { clearAllState(); handleButtonClick(null); setSafeNumbers([]) }}>{reset}</button></li>
            <li>
              <button onClick={() => NegativeNumbers()} className='button-panel'>
                <span>+</span>
                <span>/</span>
                <span>-</span>
              </button>
            </li>
            <li><button onClick={() => setPercent(true)} className='button-panel'>%</button></li>
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","].map((number) => (
              <li key={number}>
                <button className='button-panel' onClick={() => { saveNumberClick(number); handleButtonClick(null) }}>{number}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="operator-container">
          <ul>
            {["÷", "x", "—", "+"].map((operator) => (
              <li key={operator}>
                <button className={activeButton === operator ? "active button-operator" : "button-operator"} onClick={() => { saveOperatorClick(operator as Operation); handleButtonClick(operator) }}>{operator}</button>
              </li>
            ))}
            <li>
              <button className="button-operator" onClick={() => { equals(percent, operator, number1, number2); handleButtonClick(null) }}>=</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Home;
