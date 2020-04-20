import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';
import Selector from '../Selector/Selector.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);
        // we can pass this method in from another file
        // allows us to reference these methods using this.
        this.bubbleSort = this.bubbleSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.auto = this.auto.bind(this);

        this.state = {
            algorithm: this.bubbleSort,
            array: this.props.array,
            step: -1,
        };
    }

    // runs algorithm
    auto() {
        setInterval(this.state.algorithm, 200);
    }
    
    // performs a step function of bubbleSort
    bubbleSort() {
        const array = this.state.array;
        const step = this.state.step;

        // THIS DOES BUBBLE SORT STEP WISE
        if(step === -2) {
            this.setState({ step: 0 });
        }
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

        this.setState({ algorithm: funcAlgo, step: -1 });
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
                <Selector
                    auto={this.auto}
                    algorithm={this.state.algorithm}
                    chooseAlgorithm={this.chooseAlgorithm}
                    step={this.state.step}
                    array={this.state.array}
                />
                <div className="bar-container">
                    {this.state.array.map((value, i) => (
                        <Bar
                            key={i}
                            value={value}
                            style={
                                this.state.step >= 0
                                    ? i === this.state.step ||
                                      i === this.state.step + 1
                                    : false
                            }
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bars;
