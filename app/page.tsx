'use client'
// не разносил функции по хелперам (потому что, необходимо написать комментарии что бы было понятно, так же не разносил по компонентам)
import { useEffect, useState } from 'react';
// назначение типов TS
type Operation = "+" | "—" | "x" | "÷" | "%" | null;
type MR = "MR" | "MR+" | "MR-" | null;
const validateNumber = ["0", '1', '2', '3', "4", "5", "6", "7", "8", "9", "-"];
const MRs = ["MR", "MR+", "MR-"];
const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","]

const Home: React.FC = () => {
  // создание стейтов с определением типа и дефолтного значения
  const [numberFirst, setNumberFirst] = useState<string>("0")
  const [numberSecond, setNumberSecond] = useState<string>("0")
  const [answer, setAnswer] = useState<string | Operation>(numberFirst)
  const [operator, setOperator] = useState<Operation>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [reset, setReset] = useState<string>("AC");
  const [safeNumbers, setSafeNumbers] = useState<number[]>([]);
  const [errors, setErrors] = useState<string>("");
// функция запоминание чисел - сохраняет числа в стейт массив МR
  const safeMRNumber = (): void => {
    setSafeNumbers((prevNumbers) => answer ? [...prevNumbers, parseFloat(answer.replace(',', '.'))] : [...prevNumbers, 0]);
  };
// функция запоминание чисел - производит расчёты, очищает стейты, записывает результаты
  function calculateMR(operatorMR: string, safeNumbers: number[]): void {
    switch (operatorMR) {
      case "MR":
        safeMRNumber()
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
// функция меняет классы у кнопок Оператора (правый блок)
  const handleButtonClick = (button: string | null): void => {
    setActiveButton(button);
  };
// функция для установки отрицательного числа
  const NegativeNumbers = (): void => {
    if (operator === null) {
      setNumberFirst((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
    } else {
      setNumberSecond((prevNumber) => (prevNumber.includes('-') ? prevNumber.replace(/-/g, '') : `-${prevNumber}` ));
    }
  };
// функция производит расчёты числе с процентами
  const interestCalculation = (): void => {
    operator ? setNumberSecond((parseFloat(numberFirst.replace(',', '.')) * (parseFloat(numberSecond.replace(',', '.')) / 100)).toString()) : setNumberFirst((parseFloat(numberFirst.replace('‚', '.')) / 100).toString())
  };
// функция производит расчёты числе с операторами (+, -, *, /)
  function calculate(operator: Operation, numberFirst: number, numberSecond: number): number {
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
            setErrors("Деление на ноль невозможно")
            throw new Error("Деление на ноль невозможно");
        }
        default:
        throw new Error("Неизвестный оператор");
    }
  };
  // функция записывает в стейт первое и второе число с валидацией
  const saveNumberClick = (number: string): void => {
    if (operator === null) {
      setNumberFirst((prevNumber) => {
        const isValidNumber = prevNumber.split('').every((char) => validateNumber.includes(char));
        const updatedNumber = /^-?0$/.test(prevNumber) && isValidNumber && number !== "," ? prevNumber.replace('0', "") : prevNumber;
        return updatedNumber + number.replace('‚', '.');
      });
      setReset("C");
    } else {
      setNumberSecond((prevNumber) => {
        const isValidNumber = prevNumber.split('').every((char) => validateNumber.includes(char));
        const updatedNumber = /^-?0$/.test(prevNumber) && isValidNumber && number !== "," ? prevNumber.replace('0', "") : prevNumber;
        return updatedNumber + number.replace('‚', '.');
      });
    }
  };
  // Хук обновляет значение стейтов для своевременного отображение на экране + меняет , на . для корретного вычесления
  useEffect(() => {
    if (operator === null) {
      setAnswer(numberFirst.replace('.', '‚'));
    } else {
      setAnswer(numberSecond.replace('.', '‚'))
    }
  }, [numberFirst, numberSecond]);
//  функция которая записывает опреторы в стейт
  const saveOperatorClick = (operator: Operation): void => {
    setOperator(operator)
  };
// функция очистки стейтов (зброс калькулятора)
  const clearAllState = (): void => {
    setNumberFirst("0")
    setAnswer(numberFirst)
    setNumberSecond("0")
    setOperator(null)
    setReset("AC")
    setErrors("")
  };
// функция (=) которая вызывает функции для расчёта и обновляет нужные стейты с преобразованием в нужный формат
  const equals = (operator: Operation, numberFirst: string, numberSecond: string): void => {
    try {
      if (!operator || !numberFirst || !numberSecond) {
        return;
      }

      const parseNumber = (num: string) => parseFloat(num.replace(',', '.'));

      const result = calculate(operator, parseNumber(numberFirst), parseNumber(numberSecond));
      
      setNumberFirst(result.toString().replace('.', '‚'));
      setNumberSecond("0");
      setOperator(null);
    } catch (error) {
      console.error('Ошибка');
    }
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
            <li><button onClick={() => interestCalculation()} className='button-panel'>%</button></li>
            {numbers.map((number) => (
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
              <button className="button-operator" onClick={() => { equals(operator, numberFirst, numberSecond); handleButtonClick(null) }}>=</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Home;
