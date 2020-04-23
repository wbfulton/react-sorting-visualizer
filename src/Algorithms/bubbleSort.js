import { swapBars } from '../utils/utils.js';

// press button and move index and compare
// only if we already performed action on current compare
// we want to compare first, then operate
// bubbleSort step wise
function bubbleSort(
    array,
    index,
    setArray,
    setIndex,
    setCompare,
    setSwap,
    addSortedIndices,
    sortedIndices,
    currCompare
) {
    // defines when we should stop
    let stop = array.length - sortedIndices.length;

    // reset index at end of array
    if (index === stop - 2) {
        setIndex(0);
        // resets entirely if we do not
        if (!(array[index] > array[index + 1])) {
            setCompare(0, 1);
        }
        addSortedIndices(index + 1);

        for (let i = 0; i < sortedIndices.length; i++) {
            const bar = document.getElementById(`${sortedIndices[i]}`);
            bar.style.borderBottom = '2px solid forestgreen';
            bar.style.color = 'forestgreen';
            bar.style.backgroundColor = 'skyblue';
        }
    }

    const lookedAt = currCompare[0] === index && currCompare[1] === index + 1;

    // clear swap
    setSwap(-1, -1);

    if (lookedAt) {
        // swap or move on
        if (array[index] > array[index + 1]) {
            const newArray = swapBars(array, index, index + 1);
            setSwap(index, index + 1);
            setArray(newArray);
        } else if (index !== stop - 2) {
            // move on
            setIndex(index + 1);
            setCompare(index + 1, index + 2);
        }
    } else {
        // look at
        setCompare(index, index + 1);
    }
}

export default bubbleSort;
