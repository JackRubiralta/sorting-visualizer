import * as visualizer from "./modules/visualizer.js";
import * as algorithms from "./modules/algorithms.js";

var array = [16, 82, 33, 65, 92];
visualizer.render(array);
algorithms.selectionSort(array, visualizer)
document.getElementById('reset-array-button').onclick = () => {algorithms.generateArray(40, 140, 10, array, visualizer)};
document.getElementById('selection-sort-button').onclick = () => {algorithms.selectionSort(array, visualizer)};
document.getElementById('test-button').onclick = () => {visualizer.render(array)};

