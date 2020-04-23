// returns random integer from min to max
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}

// returns array with random integers based on window height
// and size based of width of window
export function initArray() {
    // changes number of bars on refresh
    const width = window.innerWidth;
    const numBars = Math.floor(width / 40);
    // changes height of bars on refresh
    const min = window.innerHeight * 0.025;
    const max = window.innerHeight * 0.6;

    const array = [];
    for (let i = 0; i < numBars; i++) {
        array[i] = getRandomInt(min, max);
    }

    return array;
}

// checks if two arrays are equal
export function isEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

// returns sorted array
export function sortArray(array) {
    return array.slice().sort((a, b) => {
        return a > b ? 1 : b > a ? -1 : 0;
    });
}

// swaps two bars and returns array
export function swapBars(array, i, j) {
    const value = array[i];
    array[i] = array[j];
    array[j] = value;
    return array;
}
