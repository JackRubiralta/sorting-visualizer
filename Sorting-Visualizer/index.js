import * as algorithms from "./modules/algorithms.js";
import * as visualizer from "./modules/visualizer.js";

var array = [16, 82, 33, 65, 92];
document.getElementById('reset-array-button').onclick = () => {algorithms.generateArray(40, 140, 20, array)};
document.getElementById('selection-sort-button').onclick = () => {algorithms.selectionSort(array)};
document.getElementById('bubble-sort-button').onclick = () => {algorithms.bubbleSort(array)};
document.getElementById('quick-sort-button').onclick = () => {algorithms.quickSort(array, 0, array.length - 1);  };

