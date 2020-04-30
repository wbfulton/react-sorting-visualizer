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
            algorithm: this.mergeSort, // stores algo to use
            array: [], // current array
            sortedArray: [], // sorted array for testing
            index: 0, // where the algo is looking
            // holds states for displaying features
            display: {
                swap: [], // which bars to display swapped
                compare: [], // which bars to display compared
                sortedIndices: [], // which bars are in final sorted place
            },
            // holds states for running algo
            automate: {
                intervalTime: 50, // how often steps are called (ms)
                running: false, // if algo is running
                intervals: null, // variable to hold interval (so algo can run)
            },
            // holds states necessary for merge sort
            merge: {
                subarray_size: 1,
                left_start: 1,
            },
        };
    }

    // runs before component renders
    componentDidMount() {
        const array = initArray();
        const sortedArray = sortArray(array);
        this.setState({
            array: array,
            sortedArray: sortedArray,
        });
    }

    // resets all values
    resetArray = () => {
        this.setState({
            index: 0,
            display: {
                swap: [],
                compare: [],
                sortedIndices: [],
            },
        });
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
        const automate = this.state.automate;
        automate.intervalTime = parseInt(e.target.value);
        this.setState({ automate: automate });
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
        if (!this.state.automate.running) {
            const automate = this.state.automate;
            automate.running = true;
            this.setState({ automate: automate });

            const display = this.state.display;
            display.intervals = setInterval(() => {
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
            }, this.state.automate.intervalTime);

            this.setState({ display: display });
        }
    };

    stopAlgo = () => {
        clearInterval(this.state.display.intervals);
        const automate = this.state.automate;
        automate.intervals = null;
        automate.running = false;
        this.setState({ automate: automate });
    };

    addSortedIndices = (i) => {
        const indices = this.state.display.sortedIndices;
        indices[indices.length] = i;
        const display = this.state.display;
        display.sortedIndices = indices;
        this.setState({ display: display });
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
        let func = this.mergeSort;

        if (stringAlgo === 'quickSort') {
            func = this.quickSort;
        } else if (stringAlgo === 'insertionSort') {
            func = this.insertionSort;
        } else if (stringAlgo === 'bubbleSort') {
            func = this.bubbleSort;
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
                this.state.display.sortedIndices,
                this.state.display.compare
            );
        } else {
            this.success();
        }
    };

    insertionSort() {
        console.log('in sort');
    }

    mergeSort = () => {
        const array = this.state.array;
        const size = this.state.array.length;

        let subarray_size = this.state.merge.subarray_size; // holds current size of sub arrays
        let left_start = this.state.merge.left_start;

        // each click
        // increase left_start by 2 * subaray size
        // when left_start >= size - 1
        //      set left_start to zero, increase subarray_size by * 2
        for (subarray_size = 1; subarray_size <= size - 1; subarray_size *= 2) {
            // pick starting point of different
            // subarrays of current size
            for (
                left_start = 0;
                left_start < size - 1;
                left_start += 2 * subarray_size
            ) {
                // Find ending point of left
                // subarray. mid+1 is starting
                // point of right
                const mid = Math.min(left_start + subarray_size - 1, size - 1);

                const right_end = Math.min(
                    left_start + 2 * subarray_size - 1,
                    size - 1
                );

                // Merge Subarrays arr[left_start...mid]
                // & arr[mid+1...right_end]
                merge(array, left_start, mid, right_end, this.setArray);
            }
        }

        this.setArray(array);
    };

    quickSort() {
        console.log('quick sort');
    }

    setCompare = (i, j) => {
        const display = this.state.display;

        let compare = [];
        // so we can reset swap
        if (i !== -1 && j !== -1) {
            compare = [i, j];
        }

        display.compare = compare;
        this.setState({ display: display });
    };

    setSwap = (i, j) => {
        const display = this.state.display;

        let swap = [];
        // so we can reset swap
        if (i !== -1 && j !== -1) {
            swap = [i, j];
        }

        display.swap = swap;

        this.setState({ display: display });
    };

    render() {
        // maps bars from array
        return (
            <div>
                <Selector
                    sort={
                        this.state.automate.running
                            ? this.stopAlgo
                            : this.startAlgo
                    }
                    toggle={this.state.automate.running}
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
                            swap={this.state.display.swap.includes(i)}
                            compare={this.state.display.compare.includes(i)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bars;
