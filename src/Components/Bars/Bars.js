import React from 'react';
import './Bars.css';
import Bar from '../Bar/Bar.js';

class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: this.props.array,
            step: 0,
        };
        // we can pass this method in from another file
        this.bubbleSort = this.bubbleSort.bind(this);
    }

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
            console.log('what');
            this.setState({ step: 0 });
        } else if (array[step] > array[step + 1]) {
            this.swapBars(step, step + 1);
        } else {
            this.setState({ step: step + 1 });
        }
    }

    swapBars(i, j) {
        const array = this.state.array;
        const value = array[i];
        array[i] = array[j];
        array[j] = value;
        this.setState({ array: array });
    }

    render() {
        // maps bars from array
        return (
            <div>
                <button className="button" onClick={this.bubbleSort}>
                    Bubble Sort
                </button>
                <div className="bar-container">
                    {this.state.array.map((value, i) => (
                        <Bar
                            key={i}
                            value={value}
                            style={i === this.state.step|| i === this.state.step + 1}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bars;
