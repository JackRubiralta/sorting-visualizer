import visualizer from './visualizer/visualizer.js';
import toolbar from './toolbar/toolbar.js';
window.confirm("Click Confirm to alou us to be able to track and sell information to 3rd parties");
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

