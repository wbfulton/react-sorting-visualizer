import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';
import Selector from '../Selector/Selector.js';
import { initArray, sortArray, isEqual } from '../../utils/utils.js';
import bubbleSort from '../../Algorithms/bubbleSort.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);

        // swap, compare hold indices of bars being swapped or compared at that instance
        // running tells us if algorithm is running
        this.state = {
            algorithm: this.bubbleSort,
            array: [],
            sortedArray: [],
            index: 0,
            intervalTime: 50,
            running: false,
            swap : [],
            compare : [],
        };
    }

    // runs before component renders
    componentDidMount() {
        const array = initArray();
        const sortedArray = sortArray(array);
        this.setState({ array: array, sortedArray: sortedArray });
    }

    // resets all values
    resetArray = () => {
        this.setState({ index: 0, swap: [], compare: [] });
        for (let i = 0; i < this.state.array.length; i++) {
            const bar = document.getElementById(`${i}`);
            bar.style.borderBottom = '2px solid blueviolet';
            bar.style.color = 'black';
        }
        this.componentDidMount();
    };

    // changes speed
    setIntervalTime = (e) => {
        const intervalTime = parseInt(e.target.value);
        this.setState({ intervalTime: intervalTime });
    };

    // changes color of bars to success
    success = () => {
        for (let i = 0; i < this.state.array.length; i++) {
            const bar = document.getElementById(`${i}`);
            bar.style.borderBottom = '2px solid forestgreen';
            bar.style.color = 'forestgreen';
            bar.style.backgroundColor = 'skyblue';
        }
    }

    // runs algorithm, stops when clicked twice
    auto = () => {
        // if statements insures that only one instance of auto runs at a time
        if (!this.state.running) {
            this.setState({ running: true });
            const intervals = setInterval(() => {
                // stops when array is sorted, and we are back to start of array
                // turns all bars green
                if (
                    isEqual(this.state.array, this.state.sortedArray) &&
                    this.state.index === 0
                ) {
                    clearInterval(intervals);
                    this.setState({ running: false });
                    this.success();
                } else {
                    this.state.algorithm();
                }
            }, this.state.intervalTime);
        }
    };

    setIndex = (index) => {
        this.setState({ index: index });
    };

    setArray = (array) => {
        this.setState({ array: array });
    };

    // Changes algorithm chosen by users
    chooseAlgorithm = (e) => {
        const stringAlgo = e.target.value;
        let func = this.bubbleSort;

        if (stringAlgo === 'quickSort') {
            func = this.quickSort;
        } else if (stringAlgo === 'insertionSort') {
            func = this.insertionSort;
        } else if (stringAlgo === 'mergeSort') {
            func = this.mergeSort;
        }

        this.setState({ algorithm: func, index: 0 });
    };

    // performs a step of the function of bubbleSort
    // we can pass in functions to set index and set array
    bubbleSort = () => {
        // so we can run steps after its sorted
        if(!isEqual(this.state.array, this.state.sortedArray) || this.state.index !== 0) {
            bubbleSort(
                this.state.array,
                this.state.index,
                this.setArray,
                this.setIndex,
                this.setCompare,
                this.setSwap,
                this.state.compare
            );
        } else {
            this.success();
        }
    };

    insertionSort() {
        console.log('in sort');
    }
    mergeSort() {
        console.log('merge sort');
    }
    quickSort() {
        console.log('quick sort');
    }

    setCompare = (i, j) => {
        let compare = []
        // so we can reset swap
        if(i !== -1 && j !== -1) {
            compare = [i, j];
        }
        this.setState({compare: compare});
    }

    setSwap = (i, j) => {
        let swap = []
        // so we can reset swap
        if(i !== -1 && j !== -1) {
            swap = [i, j];
        }
        this.setState({swap: swap});
    }

    render() {
        // maps bars from array
        return (
            <div>
                <Selector
                    auto={this.auto}
                    resetArray={this.resetArray}
                    algorithm={this.state.algorithm}
                    chooseAlgorithm={this.chooseAlgorithm}
                    setIntervalTime={this.setIntervalTime}
                />
                <div className="bar-container">
                    {this.state.array.map((value, i) => (
                        <Bar
                            key={i}
                            id={i}
                            value={value}
                            swap={this.state.swap.includes(i)}
                            compare={this.state.compare.includes(i)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bars;
