function generateArray(min, max, size, array, visualizer) {
    array.length = 0;    
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min) ) + min);
    }
    visualizer.render(array);
}

function selectionSort(array, visualizer) {
    let arrayLength = array.length;
    let minIndex;

    // loop through the array and sort each value array
    for (let i = 0; i < arrayLength; i++) { // loop through all indexes of array   
        minIndex = i; // assume that element with i index is minimum

        // Find the minimum element in unsorted array 
        for (let j = i + 1; j < arrayLength; j++) { // loop through indexes of unsorted elements
    
            visualizer.compare(minIndex, j); // run the comparing visualizer
            if (array[minIndex] > array[j]) { // check if the element of minIndex is larger than value of the index j
                minIndex = j; // set minIndex to j
            }
        }

        visualizer.swap(minIndex, i); // run the swapping visualizer
        let temp = array[i]; // Swap the minimum element with element of index i 
        array[i] = array[minIndex];
        array[minIndex] = temp;
        
        visualizer.finished(i); // change the color of the bars at index minIndex to the finished color
    }
}

export {selectionSort, generateArray};

