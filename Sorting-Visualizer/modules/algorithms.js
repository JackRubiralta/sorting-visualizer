import * as visualizer from './visualizer.js';

function generateArray(min, max, size, array) {
    array.length = 0;    
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min) ) + min);
    }
    visualizer.renderArray(array);
}

async function selectionSort(array) {
    let arrayLength = array.length;
    let minIndex;

    // Loop through the array and sort each value array
    for (let i = 0; i < arrayLength; i++) { // loop through all indexes of array   
        minIndex = i; // assume that element of index i is minimum

        // Find the minimum element in unsorted array
        for (let j = i + 1; j < arrayLength; j++) { // loop through indexes of unsorted elements
    
            await visualizer.compare(minIndex, j); // run the comparing visualizer
            if (array[minIndex] > array[j]) { // check if the element of minIndex is larger than value of the index j
                minIndex = j; // set minIndex to j
            }
        }

        await visualizer.swap(minIndex, i); // run the swapping visualizer
        [array[minIndex], array[i]] = [array[i], array[minIndex]];        
        await visualizer.finished(i); // change the color of the bars at index minIndex to the finished color
    }
}

async function bubbleSort(array){
    let arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        
        for (var j = 0; j < (arrayLength - i - 1); j++) {
            await visualizer.compare(j, j + 1);
            if (array[j] > array[j + 1]) {

                await visualizer.swap(j, j + 1);
                [array[j + 1], array[j]] = [array[j], array[j + 1]]; 
            }
        }
        await visualizer.finished(arrayLength - i - 1);
    }
}


function partition(array, low, high) {
    let pivot = array[high];  
    let i = low - 1;
    for (let j = low; j <= high-1; j++) {

        visualizer.compare(j, high);
        if (array[j] < pivot) {
            i++;

            visualizer.swap(i, j);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    visualizer.swap(i + 1, high);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}

async function quickSort(array, low, high) {
    if (low < high) {
        let pivotIndex = partition(array, low, high);

        quickSort(array, low, pivotIndex - 1);  
        quickSort(array, pivotIndex + 1, high);
    }
}

export {generateArray, selectionSort, bubbleSort, quickSort};