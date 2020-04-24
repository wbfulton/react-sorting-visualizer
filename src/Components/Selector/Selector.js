import React from 'react';
import PropTypes from 'prop-types';
import './Selector.css';

// Renders List of Buttons for Controlling Sorting
function Selector(props) {
    return (
        <div className="flex-container">
            {/* Generates New Array */}
            <button className="button" onClick={props.resetArray}>
                Reset Array
            </button>
            {/* Selects Sorting Algorithm */}
            <select
                className="button"
                name="algorithm"
                onChange={props.chooseAlgorithm}
            >
                <option value="mergeSort">Merge Sort</option>
                <option value="bubbleSort">Bubble Sort</option>
                <option value="insertionSort">Insertion Sort</option>
                <option value="quickSort">Quick Sort</option>
            </select>
            {/* Does One Step of the Algorithm */}
            <button className="button" onClick={props.algorithm}>
                Step
            </button>
            {/* Sets Interval Time */}
            <select
                className="button"
                name="interval-time"
                onChange={props.setIntervalTime}
            >
                <option value={50}>Speedy Fast</option>
                <option value={200}>Fast</option>
                <option value={600}>Medium</option>
                <option value={1000}>Slow</option>
            </select>
            {/* Runs Sorting Algorithm */}
            <button className="button" onClick={props.sort}>
                {props.toggle ? 'Stop!' : 'Sort!'}
            </button>
        </div>
    );
}

Selector.propTypes = {
    setIntervalTime: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    algorithm: PropTypes.func.isRequired,
    chooseAlgorithm: PropTypes.func.isRequired,
    resetArray: PropTypes.func.isRequired,
};

export default Selector;
