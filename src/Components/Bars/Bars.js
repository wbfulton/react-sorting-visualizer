import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);
        // we can pass this method in from another file
        // allows us to reference these methods using this.
        this.bubbleSort = this.bubbleSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);

        this.state = {
            algorithm: this.bubbleSort,
            array: this.props.array,
            step: 0,
        };

    }

    // performs a step function of bubbleSort
    bubbleSort() {
        const array = this.state.array;
        const step = this.state.step;
        /*
        for (let i = 0; i < 2; i++) {
            for (let j = i + 1; j < 2; i++) {
                if(array[i] > array[j]) {
                    this.swapBars(i, j);
                }
            }
        }
        */
        // THIS DOES BUBBLE SORT STEP WISE
        // highlight two bars
        this.setState({ array });
        // perform swap logic
        if (step === array.length - 1) {
            this.setState({ step: 0 });
        } else if (array[step] > array[step + 1]) {
            this.swapBars(step, step + 1);
        } else {
            this.setState({ step: step + 1 });
        }
    }

    // swaps two bars in the state array
    swapBars(i, j) {
        const array = this.state.array;
        const value = array[i];
        array[i] = array[j];
        array[j] = value;
        this.setState({ array: array });
    }

    // Changes algorithm chosen by users
    chooseAlgorithm(e) {
        const stringAlgo = e.target.value;
        let funcAlgo = this.bubbleSort;

        if (stringAlgo === 'quickSort') {
            funcAlgo = this.quickSort;
        } else if (stringAlgo === 'insertionSort') {
            funcAlgo = this.insertionSort;
        } else if (stringAlgo === 'mergeSort') {
            funcAlgo = this.mergeSort;
        }

        this.setState({ algorithm: funcAlgo });
    }

    insertionSort() {
        console.log('in sort');
    }
    mergeSort() {
        console.log('merge sort');
    }
    quickSort() {
        console.log('quick sort');
    }

    render() {
        // maps bars from array
        return (
            <div>
                <div className="flex-container">
                    {/* Selects Sorting Algorithm*/}
                    <select
                        className="button"
                        name="algorithm"
                        onChange={(e) => this.chooseAlgorithm(e)}
                    >
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                    </select>
                    {/* Does One Step of the Algorithm*/}
                    <button className="button" onClick={this.state.algorithm}>
                        Step
                    </button>
                    {/* Runs Sorting Algorithm */}
                    <button className="button" onClick={this.state.algorithm}>
                        Bubble Sort
                    </button>
                </div>
                <div className="bar-container">
                    {this.state.array.map((value, i) => (
                        <Bar
                            key={i}
                            value={value}
                            style={
                                i === this.state.step ||
                                i === this.state.step + 1
                            }
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bars;
