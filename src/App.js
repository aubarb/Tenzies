import React, {useEffect, useState} from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import Die from './Components/Die';
import Confetti from 'react-confetti';

function App() {
  const [allDice, setAllDice] = useState([])
  const [victory, setVictory] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('bestScore')) || '')

  //Generate 1 die with random number, id and isHeld = false
  const throwDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  //Generate an array of 10 new dice 
  useEffect(() => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(throwDie());
    }
    return setAllDice(array)
  }, []);

  //Check if all Dice value are the same and set Victory to true if it is the case
  useEffect(() => {
    setVictory(allDice.length > 0 && allDice.every(die => die.value === allDice[0].value));
    if (victory) {
      console.log("Victory!")
    }
  })

  //When Victory checks if Rolls < Best score and sets new BestScore
  useEffect(() => {
    if (victory === true) {
      if (!bestScore || bestScore > score) {
        setBestScore(score)
      }
    }
  }, [victory])

  // Save bestScore to local storage
  useEffect(() => {
    localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }, [bestScore])
  
  // Toggle the isHeld of the Die that is clicked
  function handleClick(id, isHeld) {
    setAllDice(allDice.map(die => die.id === id 
      ? {...die, isHeld: !isHeld} 
      : die ))
  }

  //ThrowDie for all dice that is not held and update score
  const reshuffle = () => {
    if (victory === false) {
      setScore (score + 1)
      setAllDice(allDice.map(die => die.isHeld === false
        ? throwDie()
        : die ))
      } else {
      setScore(0)
      setAllDice(allDice.map(die => throwDie()))
    }
  }

  // Change button text according to Victory
  const buttonText = victory === true ? "New Game" : "Throw Dice"; 

  //Generate Die component
  const DiceEl = allDice.map((die) => (
    <Die 
        value={die.value} 
        isHeld={die.isHeld}
        key={die.id}
        id={die.id}
        onClick={handleClick}
    />
  ))

  return (
    <div className="App">
      {victory && <Confetti />}
      <main>
        <h1>Tenzies</h1>
        <p>Simple: try to end with all dice showing the same number by holding any you want and relaunching. Try to do this with the least attempts possible. Good luck!</p>
        <div className='h3'>
          <h3>Rolls : {score}</h3>
          <h3>Best Score : {bestScore}</h3>
        </div>
        <div className="dice--section">
            {DiceEl}
        </div>
        <button onClick={reshuffle}>{buttonText}</button>
      </main>
    </div>
  );
}

export default App;
