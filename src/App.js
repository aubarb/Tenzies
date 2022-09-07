import React from 'react';
import './index.css';
import Dice from './Components/Dice';

function App() {
  return (
    <div className="App">
      <main>
        <h1>Tenzies!</h1>
        <p>Simple: try to end with all dice showing the same number by holding any you want and relaunching. Try to do this with the least attempts possible. Good luck!</p>
        <Dice />
        <button>Click Here</button>
      </main>
    </div>
  );
}

export default App;
