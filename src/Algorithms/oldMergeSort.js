// this performs merging of two arrays
export const merge = (
    left,
    right,
    array,
    setSwap,
    setCompare,
    setArray,
    setMergeArray,
    currCompare
) => {
    //setCompare(left, right);
    // const lookedAt = currCompare[0] === left && currCompare[1] === right;

    let merged = [];
    const size = array[left].length; // size of arrays to merge

    let i = 0;
    let j = 0;
    // merges two arrays (except for largest values)
    while (i < size && j < size) {
        // 0,1  2,3  3,4  5,6
        // setCompare(left + size + i, right + size + i);
        const leftVal = array[left][i];
        const rightVal = array[right][j];

        // these are swaps
        if (leftVal < rightVal) {
            // swapping right with merged.length
            merged.push(leftVal);
            i++;
        } else {
            // need to convert index of merge to array index
            //setSwap(right, right + 1);
            merged.push(rightVal);
            j++;
        }
    }

    // These add biggest values to our merged array
    while (i < size) {
        //setSwap(left, merged.length);
        const leftVal = array[left][i];
        merged.push(leftVal);
        i++;
    }
    while (j < size) {
        //setSwap(right, merged.length);
        const rightVal = array[right][j];
        merged.push(rightVal);
        j++;
    }

    array.splice(left, 1); // removes array at index
    array[left] = merged; // adds merged array at index

    setMergeArray(array);

    // allows for array to be rendered into bars
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            arr.push(array[i][j]);
        }
    }

    setArray(arr);
};
