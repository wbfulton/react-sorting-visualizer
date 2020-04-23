import { swapBars } from '../utils/utils.js'

function bubbleSort (array, setArray, step, setStep) {
    // THIS DOES BUBBLE SORT STEP WISE
    if (step === -2) {
        setStep(0);
    }
    // perform swap logic
    if (step === array.length - 1) {
        setStep(0);
    } else if (array[step] > array[step + 1]) {
        const newArray = swapBars(array, step, step + 1);
        setArray(newArray);
    } else {
        setStep(step + 1);
    }
};

export default bubbleSort;