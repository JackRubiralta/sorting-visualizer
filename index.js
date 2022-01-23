import * as algorithms from './modules/algorithms.js';
// add some of these sorts like: https://sortvisualizer.com/gnomesort/
// add in-place merge sort but for the function thats replacing we use a implementation that is found in our insersion sort function (second for loop)
// but also think about adding merge sort like the one in visualgo
// global variable
var array = [16, 82, 33, 65, 92];

async function timer(algorithm) {
    document.getElementById('timer').innerHTML = 'Timing...';
    const start = performance.now();
    await algorithm(array);
    const duration = performance.now() - start;
    document.getElementById('timer').innerHTML = `Run Time: ${duration / 1000}`;
}

document.getElementById('reset-array-button').onclick = () => {algorithms.generateArray(40, 140, 25, array)};
document.getElementById('selection-sort-button').onclick = () => {timer(algorithms.selectionSort)};
document.getElementById('bubble-sort-button').onclick = () => {timer(algorithms.bubbleSort)};
document.getElementById('quick-sort-button').onclick = () => { timer(algorithms.quickSort) };
document.getElementById('heap-sort-button').onclick = () => { timer(algorithms.heapSort) };
document.getElementById('insertion-sort-button').onclick = () => { timer(algorithms.insertionSort) };

