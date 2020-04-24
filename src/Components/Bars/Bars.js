import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';
import Selector from '../Selector/Selector.js';
import { initArray, sortArray, isEqual } from '../../utils/utils.js';
import bubbleSort from '../../Algorithms/bubbleSort.js';
import { merge } from '../../Algorithms/mergeSort.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);

        // swap, compare hold indices of bars being swapped or compared at that instance
        // running tells us if algorithm is running
        this.state = {
            algorithm: this.bubbleSort, // stores algo to use
            array: [], // current array
            sortedArray: [], // sorted array for testing
            swap: [], // which bars to display swapped
            compare: [], // which bars to display compared
            index: 0, // where the algo is looking
            sortedIndices: [], // which bars are in final sorted place
            intervalTime: 50, // how often steps are called (ms)
            running: false, // if algo is running
            intervals: null, // variable to hold interval (so algo can run)
            mergeSteps: 1,
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
        this.setState({ index: 0, swap: [], compare: [], sortedIndices: [] , mergeSteps: 1});
        for (let i = 0; i < this.state.array.length; i++) {
            const bar = document.getElementById(`${i}`);
            bar.style.borderBottom = '4px solid blueviolet';
            bar.style.color = 'black';
        }
        this.stopAlgo();
        this.componentDidMount();
    };

    // changes speed
    setIntervalTime = (e) => {
        const intervalTime = parseInt(e.target.value);
        this.setState({ intervalTime: intervalTime });
        this.stopAlgo();
    };

    // changes color of bars to success
    // this cleans up any bars not set to green
    success = () => {
        for (let i = 0; i < this.state.array.length; i++) {
            const bar = document.getElementById(`${i}`);
            bar.style.borderBottom = '4px solid forestgreen';
            bar.style.color = 'forestgreen';
            bar.style.backgroundColor = 'skyblue';
        }
    };

    // runs algorithm, stops when clicked twice
    startAlgo = () => {
        // ensures only one auto runs at a time
        if (!this.state.running) {
            this.setState({ running: true });
            this.setState({
                intervals: setInterval(() => {
                    // stops when array is sorted, and we are back to start of array
                    // turns all bars green
                    const array = this.state.array;
                    const sortedArray = this.state.sortedArray;

                    if (isEqual(array, sortedArray) && this.state.index === 0) {
                        this.stopAlgo();
                        this.success();
                    } else {
                        this.state.algorithm();
                    }
                }, this.state.intervalTime),
            });
        }
    };

    stopAlgo = () => {
        clearInterval(this.state.intervals);
        this.setState({ intervals: null, running: false });
    };

    addSortedIndices = (i) => {
        const indices = this.state.sortedIndices;
        indices[indices.length] = i;
        console.log(indices);
        this.setState({ sortedIndices: indices });
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

        this.resetArray();
        this.setState({ algorithm: func, index: 0 });
    };

    // performs a step of the function of bubbleSort
    // we can pass in functions to set index and set array
    bubbleSort = () => {
        // so we can run steps after its sorted
        if (
            !isEqual(this.state.array, this.state.sortedArray) ||
            this.state.index !== 0
        ) {
            bubbleSort(
                this.state.array,
                this.state.index,
                this.setArray,
                this.setIndex,
                this.setCompare,
                this.setSwap,
                this.addSortedIndices,
                this.state.sortedIndices,
                this.state.compare
            );
        } else {
            this.success();
        }
    };

    insertionSort() {
        console.log('in sort');
    }

    mergeSort = () => {
        // sort 0,1, sort 2,3, sort 3,4 and so on
        // then sort [0, 1], [2, 3], [3,4] and [5, 6]
        // we can create list to hold arrays, [0], [1]
        let array = this.state.array.map((array) => {
            return [array];
        });

        // first round
        const mergeSteps = this.state.mergeSteps;
        this.setState({ mergeSteps : mergeSteps + 1});
        
        for (let i = 0; i < mergeSteps; i++) {
            let index = 0;
            let size = array.length / 2;
            // this runs whole round of merges for each iteration
            while (index < size) {
                // this merges to arrays
                // we display these two arrays as purple
                // display bars are red when they are merged
                merge(index, index + 1, array, this.setSwap, this.setCompare, this.setArray);
                index++;
            }
        }
        // so just set index = 0, set size
    };

    quickSort() {
        console.log('quick sort');
    }

    setCompare = (i, j) => {
        let compare = [];
        // so we can reset swap
        if (i !== -1 && j !== -1) {
            compare = [i, j];
        }
        this.setState({ compare: compare });
    };

    setSwap = (i, j) => {
        let swap = [];
        // so we can reset swap
        if (i !== -1 && j !== -1) {
            swap = [i, j];
        }
        this.setState({ swap: swap });
    };

    render() {
        // maps bars from array
        return (
            <div>
                <Selector
                    sort={this.state.running ? this.stopAlgo : this.startAlgo}
                    toggle={this.state.running}
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
