import React from 'react';
import './App.css';
import Bars from './Components/Bars/Bars.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Sorting Visualizer</h1>
        <p>
          Created April 19th, 2020
        </p>

      </header>
      <Bars />
    </div>
  );
}

export default App;
