import React from 'react';
import './App.css';
import Bars from './Components/Bars/Bars.js';
import Navbar from './Components/Navbar/Navbar.js';

// changes number of bars on refresh
const width = window.innerWidth;
const numBars = Math.floor(width / 40);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Bars numBars={numBars}/>
    </div>
  );
}

export default App;
