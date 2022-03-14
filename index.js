import visualizer from './visualizer/visualizer.js';
import toolbar from './toolbar/toolbar.js';
// could attack pauseTime as getter instead
function main() {
    // Pause Time Slider
    toolbar.pauseTimeSlider.oninput = function() { visualizer.pauseTime = this.value * -1; } 
    toolbar.pauseTimeSlider.oninput(); // set pause time to the pause-time-slider value

    // Array Length Slider Binding
    toolbar.arrayLengthSlider.oninput = function() { visualizer.generateArray(this.value) } 
    
    // Generate Array Button
    toolbar.generateArrayButton.onclick = function() { visualizer.generateArray(toolbar.arrayLengthSlider.value) }
    toolbar.generateArrayButton.onclick(); // set the array length to the array-length-slider value and render the bars

    toolbar.sortButton.onclick = async function() { await visualizer.visualizeAlgorithm(toolbar.selectedSortingAlgorithm); }
}

main();

