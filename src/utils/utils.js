// returns random integer from min to max
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// creates and returns array of bars with random heights from min to max
// gives bar key of index when created, value of random height
export function initArray() {
    // changes number of bars on refresh
    const width = window.innerWidth;
    const numBars = Math.floor(width / 40);
    // changes height of bars on refresh
    const min = window.innerHeight * 0.025;
    const max = window.innerHeight * 0.6;

    const barsArray = [];
    for (let i = 0; i < numBars; i++) {
        barsArray[i] = getRandomInt(min, max);
    }

    return barsArray;
}

// check if two arrays are equal
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

// js sort array function
export function sortArray(array) {
    return array.slice().sort((a, b) => {
        return a > b ? 1 : b > a ? -1 : 0;
    });
}

// swaps two bars in the state array
export function swapBars(array, i, j) {
    const value = array[i];
    array[i] = array[j];
    array[j] = value;
    // highlight swap
    const bar1 = document.getElementById(`${i}`);
    const bar2 = document.getElementById(`${j}`);
    bar1.style.backgroundColor = 'red';
    bar2.style.backgroundColor = 'red';
    return array;
}
