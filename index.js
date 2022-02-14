import visualizer from './visualizer.js';

// could have pause function be in visualizer instead
// also make sorting helper function be inside main sort function


function main() {

    // Array Length Slider
    const arrayLengthSlider = document.getElementById('array-length-slider');
    arrayLengthSlider.oninput = function() { visualizer.generateArray(this.value); } 
    arrayLengthSlider.oninput(); // set the array length to the array-length-slider value and render the bars
    
    // Generate Array Button
    const generateArrayButton = document.getElementById('generate-array-button'); 
    generateArrayButton.onclick = function() { visualizer.generateArray(arrayLengthSlider.value); };

    // Pause Time Slider
    const pauseTimeSlider = document.getElementById('pause-time-slider');
    pauseTimeSlider.oninput = function() { visualizer.setPauseTime(this.value) } 
    pauseTimeSlider.oninput(); // set pause time to the pause-time-slider value
    
  


    // Selection Sort Button
    const selectionSortButton = document.getElementById('selection-sort-button');
    selectionSortButton.onclick = visualizer.selectionSort;

    // Bubble Sort Button
    const bubbleSortButton = document.getElementById('bubble-sort-button');
    bubbleSortButton.onclick = visualizer.bubbleSort;

    // Quick Sort Button
    const quickSortButton = document.getElementById('quick-sort-button');
    quickSortButton.onclick = visualizer.quickSort;

    // Heap Sort Button
    const heapSortButton = document.getElementById('heap-sort-button');
    heapSortButton.onclick = visualizer.heapSort;

    // Insertion Sort Button
    const insertionSortButton = document.getElementById('insertion-sort-button');
    insertionSortButton.onclick = visualizer.insertionSort;

    // Merge Sort Button
    const mergeSortButton = document.getElementById('merge-sort-button');
    mergeSortButton.onclick = visualizer.mergeSort;

    
}

main();
