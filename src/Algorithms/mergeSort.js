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
    setArrayIndex
) => {
    // index of where to end subarrays
    const endLeft = middle - left + 1;
    const endRight = right - middle;

    // merges two arrays (except for largest values)
    if (leftIndex < endLeft && rightIndex < endRight) {
        const leftVal = L[leftIndex];
        const rightVal = R[rightIndex];

        // these are swaps
        if (leftVal < rightVal) {
            array[arrayIndex] = leftVal;
            setLeftIndex(leftIndex + 1);
        } else {
            array[arrayIndex] = rightVal;
            setRightIndex(rightIndex + 1);
        }

        setArrayIndex(arrayIndex + 1);
    } else if (leftIndex < endLeft) {
        console.log(L);
        console.log(R);
        const leftVal = L[leftIndex];
        array[arrayIndex] = leftVal;

        setLeftIndex(leftIndex + 1);
        setArrayIndex(arrayIndex + 1);
    } else if (rightIndex < endLeft) {
        const rightVal = R[rightIndex];
        array[arrayIndex] = rightVal;

        setRightIndex(rightIndex + 1);
        setArrayIndex(arrayIndex + 1);
    }
};
