import React from 'react';
import './Selector.css';

class Selector extends React.Component {
    render() {
        return (
            <div className="flex-container">
                {/* Selects Sorting Algorithm */}
                <select
                    className="button"
                    name="algorithm"
                    onChange={this.props.chooseAlgorithm}
                >
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                </select>
                {/* Does One Step of the Algorithm */}
                <button className="button" onClick={this.props.algorithm}>
                    Step
                </button>
                {/* Sets Speed */}
                <select
                    className="button"
                    name="speed"
                    onChange={this.props.setSpeed}
                >
                    <option value={50}>Speedy Fast</option>
                    <option value={200}>Fast</option>
                    <option value={600}>Medium</option>
                    <option value={1000}>Slow</option>
                </select>
                {/* Runs Sorting Algorithm */}
                <button className="button" onClick={this.props.auto}>
                    Sort!
                </button>
            </div>
        );
    }
}

export default Selector;
