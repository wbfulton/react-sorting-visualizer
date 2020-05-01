// this performs merging of two arrays
export const merge = (
    array,
    left,
    middle,
    right,
    L,
    R,
    leftIndex,
    rightIndex,
    arrayIndex,
    setLeftIndex,
    setRightIndex,
    setArrayIndex,
    currCompared,
    setCompare,
    setSwap
) => {
    // index of where to end subarrays
    const endLeft = middle - left + 1;
    const endRight = right - middle;

    let value = array[arrayIndex];
    let compare = [];
    let compared = false;

    // merges two arrays (except for largest values)
    if (leftIndex < endLeft && rightIndex < endRight) {
        const leftVal = L[leftIndex];
        const rightVal = R[rightIndex];
        compare = [arrayIndex, left + L.length + rightIndex];
        setSwap(-1, -1);

        if (currCompared[0] === compare[0] && currCompared[1] === compare[1]) {
            compared = true;
            // these are swaps
            if (leftVal < rightVal) {
                value = leftVal;
                setLeftIndex(leftIndex + 1);
            } else {
                value = rightVal;
                setRightIndex(rightIndex + 1);
            }
        }
    } else if (leftIndex < endLeft) {
        compared = true;
        value = L[leftIndex];
        setCompare(-1, -1);

        setLeftIndex(leftIndex + 1);
    } else if (rightIndex < endLeft) {
        compared = true;
        value = R[rightIndex];
        setCompare(-1, -1);

        setRightIndex(rightIndex + 1);
    }

    if (compared) {
        array[arrayIndex] = value;
        //array[] = 

        setSwap(arrayIndex, arrayIndex);
        setArrayIndex(arrayIndex + 1);
    } else {
        setCompare(compare[0], compare[1]);
    }
};
