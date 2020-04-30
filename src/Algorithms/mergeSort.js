// this performs merging of two arrays
export const merge = (array, left, middle, right, setArray) => {
    // index of where to end subarrays
    const endLeft = middle - left + 1;
    const endRight = right - middle;

    // holds subarrays
    let L = [];
    let R = [];

    // adds values from array into subarrays to be merged
    for (let i = 0; i < endLeft; i++) {
        L[i] = array[left + i];
    }
    for (let j = 0; j < endRight; j++) {
        R[j] = array[middle + 1 + j];
    }

    let i = 0;
    let j = 0;
    let arrayIndex = left;
    // merges two arrays (except for largest values)
    while (i < endLeft && j < endRight) {
        const leftVal = L[i];
        const rightVal = R[j];

        // these are swaps
        if (leftVal < rightVal) {
            array[arrayIndex] = leftVal;
            i++;
        } else {
            array[arrayIndex] = rightVal;
            j++;
        }
        arrayIndex++;
    }

    // Adds remaining values from subarrays
    while (i < endLeft) {
        const leftVal = L[i];
        array[arrayIndex] = leftVal;
        i++;
        arrayIndex++;
    }
    while (j < endRight) {
        const rightVal = R[j];
        array[arrayIndex] = rightVal;
        j++;
        arrayIndex++;
    }

    // setArray(array);
    // no need to return array due to reference semantics
};
