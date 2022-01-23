import * as algorithms from './modules/algorithms.js';

// global variable
var array = [16, 82, 33, 65, 92];

async function timer(algorithm) {
    document.getElementById('timer').innerHTML = 'Timing...';
    const start = performance.now();
    await algorithm(array);
    const duration = performance.now() - start;
    document.getElementById('timer').innerHTML = `Run Time: ${duration / 1000}`;
}

document.getElementById('reset-array-button').onclick = () => {algorithms.generateArray(40, 140, 20, array)};
document.getElementById('selection-sort-button').onclick = () => {timer(algorithms.selectionSort)};
document.getElementById('bubble-sort-button').onclick = () => {timer(algorithms.bubbleSort)};
document.getElementById('quick-sort-button').onclick = () => { timer(algorithms.quickSort) };
