'use client'
import { useEffect, useState } from 'react';

type Operation = "+" | "-" | "*" | "/";

const Home: React.FC = () => {
  const [answer, setAnswer] = useState<number | Operation>(0)
  const [number1, setNumber1] = useState<number | null>(null)
  const [number2, setNumber2] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operation | null>(null);

  function calculate(operator: Operation, number1: number, number2: number): number {
    switch (operator) {
      case "+":
        return number1 + number2;
      case "-":
        return number1 - number2;
      case "*":
        return number1 * number2;
      case "/":
        if (number2 !== 0) {
            return number1 / number2;
        } else {
            throw new Error("Деление на ноль невозможно");
        }
    }
  }
  
  const saveNumberClick = (number: number): void => {
    if (operator === null) {
      setNumber1((prevNumber) => (prevNumber !== null ? prevNumber * 10 + number : number));
    } else {
      setNumber2((prevNumber) => (prevNumber !== null ? prevNumber * 10 + number : number));
    }
  }

  useEffect(() => {
    if (number1 !== null) {
      setAnswer(number1)
    }
    if (operator !== null) {
      setAnswer(operator)
    }
    if (number2 !== null) {
      setAnswer(number2)
    }
  }, [number1, number2, operator]);

  const saveOperatorClick = (operator: Operation): void => {
    setOperator(operator)
  }

  const clearAllState = (): void => {
    setAnswer(0)
    setNumber1(null)
    setNumber2(null)
    setOperator(null)
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <div className="p-5 mb-5 main">{answer}</div>
      <div className='d-flex'>
        <div className="me-5">
          <ul className="list-unstyled column-list">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((number) => (
              <li key={number}>
                <button onClick={() => saveNumberClick(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="list-unstyled operator-list">
             {["+", "-", "*", "/"].map((operator) => (
              <li key={operator}>
                <button onClick={() => saveOperatorClick(operator as Operation)}>{operator}</button>
              </li>
            ))}
            <li>
              <button onClick={() => {
                try {
                  if (operator && number1 !== null && number2 !== null) {
                    const result = calculate(operator, number1, number2);
                    setAnswer(result)
                    setNumber1(null)
                    setNumber2(null)
                    setOperator(null)
                  } 
                } catch (error) {
                  console.error('Ошибка');
                }
                }}>
                =
              </button>
            </li>
            <li>
              <button onClick={() => clearAllState()}>C</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Home;
