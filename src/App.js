import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <h1>JS Clicker Game</h1>
      <p>This is a clicker game that I'm using to teach myself React.</p>
      <p>Start dev shops to make money and be the richest developer ever. Have fun!</p>
      <div className="Game-container">
        <Game />
      </div>
    </div>
  );
}

export default App;
