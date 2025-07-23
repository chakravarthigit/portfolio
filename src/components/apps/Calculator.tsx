import React, { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  
  const clearAll = () => {
    setDisplay("0");
    setMemory(null);
    setOperation(null);
    setWaitingForOperand(false);
  };
  
  const clearDisplay = () => {
    setDisplay("0");
  };
  
  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };
  
  const inputPercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };
  
  const inputDot = () => {
    if (!/\./.test(display)) {
      setDisplay(display + ".");
      setWaitingForOperand(false);
    }
  };
  
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };
  
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    
    if (memory === null) {
      setMemory(inputValue);
    } else if (operation) {
      const currentValueParsed = parseFloat(display);
      const newValue = calculateOperation(memory, currentValueParsed, operation);
      
      setMemory(newValue);
      setDisplay(String(newValue));
      
      // Add to history
      setHistory([...history, `${memory} ${operation} ${currentValueParsed} = ${newValue}`]);
    }
    
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };
  
  const calculateOperation = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return first / second;
      default:
        return second;
    }
  };
  
  const handleEquals = () => {
    if (!memory || !operation) return;
    
    const inputValue = parseFloat(display);
    const newValue = calculateOperation(memory, inputValue, operation);
    
    // Add to history
    setHistory([...history, `${memory} ${operation} ${inputValue} = ${newValue}`]);
    
    setDisplay(String(newValue));
    setMemory(null);
    setOperation(null);
    setWaitingForOperand(true);
  };
  
  // Button styling
  const digitButtonClass = "calc-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl";
  const operationButtonClass = "calc-btn bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xl";
  const functionButtonClass = "calc-btn bg-gray-500 hover:bg-gray-400 text-white font-semibold text-lg";
  
  return (
    <div className="calculator-container h-full flex flex-col bg-gray-800 text-white">
      {/* Calculator Display */}
      <div className="calc-display-area bg-gray-900 p-4 flex flex-col items-end justify-end">
        <div className="history text-gray-400 text-sm h-6 overflow-hidden">
          {history.length > 0 && history[history.length - 1]}
        </div>
        <div className="current-value text-4xl font-light tracking-wide overflow-x-auto whitespace-nowrap w-full text-right">
          {display}
        </div>
      </div>
      
      {/* Calculator Buttons */}
      <div className="calc-buttons flex-1 grid grid-cols-4 gap-0.5 p-0.5 bg-gray-900">
        {/* Row 1 */}
        <button 
          className={functionButtonClass}
          onClick={clearAll}
        >
          AC
        </button>
        <button 
          className={functionButtonClass}
          onClick={toggleSign}
        >
          +/-
        </button>
        <button 
          className={functionButtonClass}
          onClick={inputPercent}
        >
          %
        </button>
        <button 
          className={operationButtonClass}
          onClick={() => performOperation("÷")}
        >
          ÷
        </button>
        
        {/* Row 2 */}
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("7")}
        >
          7
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("8")}
        >
          8
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("9")}
        >
          9
        </button>
        <button 
          className={operationButtonClass}
          onClick={() => performOperation("×")}
        >
          ×
        </button>
        
        {/* Row 3 */}
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("4")}
        >
          4
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("5")}
        >
          5
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("6")}
        >
          6
        </button>
        <button 
          className={operationButtonClass}
          onClick={() => performOperation("-")}
        >
          -
        </button>
        
        {/* Row 4 */}
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("1")}
        >
          1
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("2")}
        >
          2
        </button>
        <button 
          className={digitButtonClass}
          onClick={() => inputDigit("3")}
        >
          3
        </button>
        <button 
          className={operationButtonClass}
          onClick={() => performOperation("+")}
        >
          +
        </button>
        
        {/* Row 5 */}
        <button 
          className={`${digitButtonClass} col-span-2`}
          onClick={() => inputDigit("0")}
        >
          0
        </button>
        <button 
          className={digitButtonClass}
          onClick={inputDot}
        >
          .
        </button>
        <button 
          className={operationButtonClass}
          onClick={handleEquals}
        >
          =
        </button>
      </div>
      
      {/* Scientific Calculator Mode (hidden by default) */}
      <div className="scientific-buttons hidden grid grid-cols-5 gap-0.5 p-0.5 bg-gray-900">
        <button className={functionButtonClass}>sin</button>
        <button className={functionButtonClass}>cos</button>
        <button className={functionButtonClass}>tan</button>
        <button className={functionButtonClass}>ln</button>
        <button className={functionButtonClass}>log</button>
        
        <button className={functionButtonClass}>sinh</button>
        <button className={functionButtonClass}>cosh</button>
        <button className={functionButtonClass}>tanh</button>
        <button className={functionButtonClass}>e</button>
        <button className={functionButtonClass}>EE</button>
        
        <button className={functionButtonClass}>x²</button>
        <button className={functionButtonClass}>x³</button>
        <button className={functionButtonClass}>xʸ</button>
        <button className={functionButtonClass}>eˣ</button>
        <button className={functionButtonClass}>10ˣ</button>
        
        <button className={functionButtonClass}>1/x</button>
        <button className={functionButtonClass}>²√x</button>
        <button className={functionButtonClass}>³√x</button>
        <button className={functionButtonClass}>ʸ√x</button>
        <button className={functionButtonClass}>x!</button>
      </div>
    </div>
  );
};

export default Calculator;
