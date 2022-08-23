import './App.css';
import React from 'react';
import { useState } from 'react';

const calculatorData = [
    {id: "clear", value: "AC"},
    {id: "divide", value: "/"},
    {id: "multiply", value: "*"},
    {id: "seven", value: 7},
    {id: "eight", value: 8},
    {id: "nine", value: 9},
    {id: "subtract", value: "-"},
    {id: "four", value: 4},
    {id: "five", value: 5},
    {id: "six", value: 6},
    {id: "addition", value: "+"},
    {id: "one", value: 1},
    {id: "two", value: 2},
    {id: "three", value: 3},
    {id: "equal", value: "="},
    {id: "zero", value: 0},
    {id: "decimal", value: "."}
]

const operators = ["AC", "/", "*", "+", "-", "="];
const decimalPoint = ["."];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


function App() {
  const [input, setInput] = useState("0");
  const [display, setDisplay] = useState("");
  const [evaluated, setEvaluated] = useState(false);


  const handleEqual = () => {
    // if (display.charAt(display.length-1) === "+" || display.charAt(display.length-1) ==="-") {
    //   let prevInput = display.replace(/.$/, "=");
    //   console.log(prevInput);
    //   setDisplay(prevInput.concat(eval(prevInput))); 
    // } else {
      if (input==="0") {
        return
      } else {
        setInput(eval(display));
        setEvaluated(true);
        setDisplay(display.concat("=", eval(display)));
        console.log('handleEqual');
      }
  }




  const handleClear = () => {
    setInput("0");
    setEvaluated(false);
    setDisplay("");
    console.log('handleClear');
  }

  const dotOperator = () => {
    if (display.charAt(display.length-1) === "." || input.charAt(input.length-1) === ".") {
      setInput(input.replace(/.$/, "."));
      setDisplay(display.replace(/.$/, "."));
      console.log('dotOperator');
    } else if (input.includes(decimalPoint)) {
      return 
    } else if (operators.includes(input.charAt(input.length-1))){
      setDisplay(display.concat("."));
      setInput(("."));
    } else {
      setInput(input.concat("."));
      setDisplay(display.concat("."));
    }
  }

  const handleOperator = (value) => {
    if (operators.includes(display.charAt(display.length-1))) {
      setInput(input.replace(/.$/, value));
      setDisplay(display.replace(/.$/, value));
    } else if (input === ".") {
      return
    } else if (evaluated === true) {
      return
    }
    else {
      setInput(value);
      setDisplay(display.concat(value));
    }
    console.log(input);
    console.log('handleOperator');
  }


  const handleNumbers = (value) => {
    if (input === "0") {
      setInput(input.replace(/.$/, value)); 
      setDisplay(display.concat(value)) 
    } else if (operators.includes(input.charAt(input.length-1))){
      if (display.length===1){
        setDisplay((value));
        setInput((value));
      } else {
        setDisplay(display.concat(value));
        setInput((value));
      }
    } else {
      setDisplay(display.concat(value));
      setInput(input.concat(value));
    }
    console.log(input);
    console.log('handleNumbers');
  }



  const handleInput = (event) => {
    let value = event.target.innerHTML;
    const operator = operators.find(op => op === value);
    const number = numbers.find(num => num === value);
    switch (value) {
      case "=":
        handleEqual();
        break;
      case "AC":
        handleClear();
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperator(value);
        break;
      case number:
        handleNumbers(value);
        break;
      default:
        break;
    }

  }



  return (
    <div className='App container'>
      <div className="calc-container">
        <div className='display-screen'>
          <div className='display'>{display}</div>
          <div className='input'>{input}</div>
        </div>
        <div className='numbers-container'>
          {
            calculatorData.map(key=>{
              let id = key.id;
              let value = key.value;
              return (
                <button onClick={handleInput} className={id} value={value} key={id} id={id}>{value}</button>
                )
              })
            }
        </div>
      </div>
    </div>
  );
}

export default App;
