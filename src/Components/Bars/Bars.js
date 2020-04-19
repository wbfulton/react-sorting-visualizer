import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';

// changes height of bars on refresh
const min = window.innerHeight * 0.025;
const max = window.innerHeight * 0.6;

class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // returns random integer from min to max
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    // creates and returns array of bars with random heights from min to max
    // gives bar key of index when created, value of random height
    initBars() {
        const barsArray = [];
        for (let i = 0; i < this.props.numBars; i++) {
            const height = this.getRandomInt(min, max);
            barsArray[i] = <Bar key={i} value={height} />;
        }

        return barsArray;
    }

    render() {
        // maps bars from array
        return (
            <div className="bar-container">
                {this.initBars().map((bar) => bar)}
            </div>
        );
    }
}

Bars.defaultProps = {
    numBars: 10,
};

export default Bars;
