import { swapBars } from '../utils/utils.js';

function bubbleSort(
    array,
    index,
    setArray,
    setIndex,
    setCompare,
    setSwap,
    currCompare
) {
    // THIS DOES BUBBLE SORT STEP WISE
    console.log(index + " " + (array.length - 2))
    if (index === array.length - 2) {
        setIndex(0);
    }
    // press button and move index and compare
    // only if we already performed action on current compare
    // we want to compare first, then operate
    const lookedAt = currCompare[0] === index && currCompare[1] === index + 1;
    

    if (lookedAt) {
        //swap
        if (array[index] > array[index + 1]) {
            const newArray = swapBars(array, index, index + 1);
            setSwap(index, index + 1);
            setArray(newArray);
        } else { // move on
            setIndex(index + 1);
            // reset swap
            setSwap(-1, -1);
            // we have check up above so this works
            setCompare(index + 1, index + 2);
        }
    } else {
        setCompare(index, index + 1);
        setSwap(-1, -1);
    }
}

export default bubbleSort;
