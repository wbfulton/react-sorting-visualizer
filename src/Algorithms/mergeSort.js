export const merge = (left, right, array, setSwap, setCompare, setArray) => {
    let merged = [];
    setSwap(0, 1);

    // left and right are arrays
    // we need to check left[0] with right[0], right[1]
    // we need to check left[1] with right[0], right[1]
    const size = array[left].length;

    let i = 0;
    let j = 0;
    while (i < size && j < size) {
        const leftVal = array[left][i];
        const rightVal = array[right][j];

        // these are swaps
        if (leftVal < rightVal) {
            // swapping right with merged.length
            setSwap(left, merged.length);
            merged.push(leftVal);
            i++;
        } else {
            setSwap(right, merged.length);
            merged.push(rightVal);
            j++;
        }
    }

    // unload any additional data
    while(i < size) {
        setSwap(left, merged.length);
        const leftVal = array[left][i];
        merged.push(leftVal);
        i++;
    }
    // unload any additional data
    while(j < size) {
        setSwap(right, merged.length);
        const rightVal = array[right][j];
        merged.push(rightVal);
        j++;
    }

    array.splice(left, 1);
    array[left] = merged;

    let arr = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            arr.push(array[i][j]);
        }
    }

    setArray(arr);
};