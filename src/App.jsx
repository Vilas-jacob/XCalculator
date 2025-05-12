import { useState } from 'react'
import './App.css'

function App() {
  const [inputs, setInputs] = useState([]); 
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    
    if (['+', '-', '*', '/', '='].includes(value)) {
      if (value === '=') {
        handleCalculate();
      } else {
        
        setInputs([...inputs, value]);
      }
    } else {
      
      setInputs([...inputs, value]);
    }
  };

  const handleCalculate = () => {
    if (inputs.length === 0){
      setResult('Error');
      return;
    } 

   
    const expression = inputs.join('');
    const operands = [];
    const operators = [];
    
    let currentNumber = '';

   
    for (let char of expression) {
      if (!isNaN(char)) {
        currentNumber += char; 
      } else {
        if (currentNumber) {
          operands.push(parseFloat(currentNumber)); 
          currentNumber = ''; 
        }
        operators.push(char);
      }
    }

    
    if (currentNumber) {
      operands.push(parseFloat(currentNumber));
    }

    
    let calculatedResult = operands[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextOperand = operands[i + 1];

      switch (operator) {
        case '+':
          calculatedResult += nextOperand;
          break;
        case '-':
          calculatedResult -= nextOperand;
          break;
        case '*':
          calculatedResult *= nextOperand;
          break;
        case '/':
          if (calculatedResult === 0 && nextOperand === 0) {
            calculatedResult = NaN; 
          } else if (nextOperand === 0) {
            calculatedResult = 'Infinity'; 
            calculatedResult /= nextOperand;
          }
          break;
        default:
          break;
      }
    }

    setResult(calculatedResult); 
    setInputs([]); 
  };

  const handleClear = () => {
    setInputs([]); 
    setResult(''); 
  };

  return (
    <>
    <div>
          <header>
              <h1>React Calculator</h1>
          </header>
          <main>
            <div>
              <input type='text' name='Input'value={inputs.join('')} readOnly></input>
            </div>
            <div>
              <h3>{result}</h3>
            </div>
            <div>
              <button value={7} onClick={(e)=>handleButtonClick(e.target.value)}>7</button>
              <button value={8} onClick={(e)=>handleButtonClick(e.target.value)}>8</button>
              <button value={9} onClick={(e)=>handleButtonClick(e.target.value)}>9</button>
              <button value={`+`} onClick={(e)=>handleButtonClick(e.target.value)}>+</button>
            </div>
            <div>
              <button value={4} onClick={(e)=>handleButtonClick(e.target.value)}>4</button>
              <button value={5} onClick={(e)=>handleButtonClick(e.target.value)}>5</button>
              <button value={6} onClick={(e)=>handleButtonClick(e.target.value)}>6</button>
              <button value={`-`} onClick={(e)=>handleButtonClick(e.target.value)}>-</button>
            </div>
            <div>
              <button value={1} onClick={(e)=>handleButtonClick(e.target.value)}>1</button>
              <button value={2} onClick={(e)=>handleButtonClick(e.target.value)}>2</button>
              <button value={3} onClick={(e)=>handleButtonClick(e.target.value)}>3</button>
              <button value={`*`} onClick={(e)=>handleButtonClick(e.target.value)}>*</button>
            </div>
            <div>
              <button value="" onClick={handleClear}>C</button>
              <button value={0} onClick={(e)=>handleButtonClick(e.target.value)}>0</button>
              <button value={`=`} onClick={handleCalculate}>=</button>
              <button value={`/`} onClick={(e)=>handleButtonClick(e.target.value)}>/</button>
            </div>
          </main>
    </div>
     
    </>
  )
}

export default App
