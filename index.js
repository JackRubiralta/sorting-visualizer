import { pause, arrayVisual, bufferVisual } from './modules/visualizer.js';
import * as algorithms from './algorithms.js';

var array;

function resetArray(size) {
    array = Array.from({length: size}, () => Math.floor(Math.random() * (250 - 50) ) + 50);
    arrayVisual.render(array); bufferVisual.render(size);
}

document.getElementById('pause-time-slider').oninput = function() { pause.setPauseTime(this.value) }; pause.setPauseTime(100);

document.getElementById('reset-array-button').onclick = () => resetArray(document.getElementById('array-size-slider').value);
document.getElementById('array-size-slider').oninput = function() { resetArray(this.value) };


// Sorting Algorithms
document.getElementById('selection-sort-button').onclick = () => algorithms.selectionSort(array);
document.getElementById('bubble-sort-button').onclick = () => algorithms.bubbleSort(array);
document.getElementById('quick-sort-button').onclick = () => algorithms.quickSort(array);
document.getElementById('heap-sort-button').onclick = () => algorithms.heapSort(array);
document.getElementById('insertion-sort-button').onclick = () => algorithms.insertionSort(array);
document.getElementById('merge-sort-button').onclick = () => algorithms.mergeSort(array);
