import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';
import Selector from '../Selector/Selector.js';
import { initArray, sortArray, isEqual } from '../../utils/utils.js';
import bubbleSort from '../../Algorithms/bubbleSort.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            algorithm: this.bubbleSort,
            array: [],
            sortedArray: [],
            step: -1,
            speed: 50,
        };
    }

    // runs before component renders
    componentWillMount() {
        const array = initArray();
        const sortedArray = sortArray(array);
        this.setState({ array: array, sortedArray: sortedArray });
    }

    // resets all values
    resetArray = () => {
        this.setState({ step: -1 })
        this.componentWillMount();
    }

    // changes speed
    setSpeed = (e) => {
        const speed = parseInt(e.target.value);
        this.setState({ speed: speed });
    };

    // runs algorithm
    auto = () => {
        const running = setInterval(() => {
            // stops when array is sorted, and we are back to start of array
            // turns all bars green
            if (
                isEqual(this.state.array, this.state.sortedArray) &&
                this.state.step === 0
            ) {
                clearInterval(running);
                for (let i = 0; i < this.state.array.length; i++) {
                    const bar = document.getElementById(`${i}`);
                    bar.style.borderBottom = '2px solid forestgreen';
                    bar.style.color = 'forestgreen';
                    bar.style.backgroundColor = 'skyblue';
                }
            } else {
                this.state.algorithm();
            }
        }, this.state.speed);
    };


    // performs a step function of bubbleSort
    // we can pass in functions to set steps and set array
    bubbleSort = () => {
        bubbleSort(this.state.array, this.setArray, this.state.step, this.setStep)
    }

    setStep = (step) => {
        this.setState({step: step});
    }

    setArray = (array) => {
        this.setState({ array: array });
    }

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

        this.setState({ algorithm: func, step: -1 });
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

    render() {
        // maps bars from array
        return (
            <div>
                <Selector
                    auto={this.auto}
                    resetArray={this.resetArray}
                    algorithm={this.state.algorithm}
                    chooseAlgorithm={this.chooseAlgorithm}
                    setSpeed={this.setSpeed}
                />
                <div className="bar-container">
                    {this.state.array.map((value, i) => (
                        <Bar
                            key={i}
                            id={i}
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
