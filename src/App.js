import React, {useEffect, useState} from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import Die from './Components/Die';

function App() {
  const [allDice, setAllDice] = useState([])

  useEffect(() => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      });
    }
    return setAllDice(array)
  }, []);

  function handleClick() {
    console.log("clicked")
  }

  const DiceEl = allDice.map((die) => (
    <Die 
        value={die.value} 
        isHeld={die.isHeld}
        key={die.id}
        onClick={handleClick()}
    />
  ))

  console.log(allDice)

  return (
    <div className="App">
      <main>
        <h1>Tenzies!</h1>
        <p>Simple: try to end with all dice showing the same number by holding any you want and relaunching. Try to do this with the least attempts possible. Good luck!</p>
        <div className="dice--section">
            {DiceEl}
        </div>
        <button onClick={handleClick}>Click Here</button>
      </main>
    </div>
  );
}

export default App;
