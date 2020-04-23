import { swapBars } from '../utils/utils.js';

function bubbleSort(array, index, setArray, setIndex) {
    // paint comparing bars
    if (index > 0) {
        const bar1 = document.getElementById(`${index}`);
        bar1.style.backgroundColor = 'blueviolet';
        // edge case
        if(index < array.length - 1) {
            const bar2 = document.getElementById(`${index + 1}`);
            bar2.style.backgroundColor = 'blueviolet';
        }
    }

    // THIS DOES BUBBLE SORT STEP WISE
    if (index === -2) {
        setIndex(0);
    }
    // perform swap logic
    if (index === array.length - 1) {
        setIndex(0);
    } else if (array[index] > array[index + 1]) {
        const newArray = swapBars(array, index, index + 1);
        setArray(newArray);
    } else {
        setIndex(index + 1);
    }
}

export default bubbleSort;
