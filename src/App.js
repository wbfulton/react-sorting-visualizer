import React from 'react';
import './App.css';
import Bars from './Components/Bars/Bars.js';
import Navbar from './Components/Navbar/Navbar.js';

// changes number of bars on refresh
const width = window.innerWidth;
const numBars = Math.floor(width / 40);

// changes height of bars on refresh
const min = window.innerHeight * 0.025;
const max = window.innerHeight * 0.6;

// returns random integer from min to max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// creates and returns array of bars with random heights from min to max
// gives bar key of index when created, value of random height
function initArray() {
    const barsArray = [];
    for (let i = 0; i < numBars; i++) {
        barsArray[i] = getRandomInt(min, max);
    }

    return barsArray;
}

const array = initArray();
const sortedArray = array.slice().sort((a, b) => {
    return a > b ? 1 : b > a ? -1 : 0;
});
function App() {
    return (
        <div className="App">
            <Navbar />
            <Bars array={array} sortedArray={sortedArray} />
        </div>
    );
}

export default App;
