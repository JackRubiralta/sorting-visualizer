import visualizer from './visualizer/visualizer.js';
import toolbar from './toolbar/toolbar.js';

function main() {

    // Array Length Slider
    toolbar.arrayLengthSlider.oninput = function() { visualizer.generateArray(this.value); } 
    toolbar.arrayLengthSlider.oninput(); // set the array length to the array-length-slider value and render the bars
    
    // Generate Array Button
    toolbar.generateArrayButton.onclick = function() { window.stop(); visualizer.generateArray(toolbar.arrayLengthSlider.value); };

    // Pause Time Slider
    toolbar.pauseTimeSlider.oninput = function() { visualizer.setPauseTime(this.value) } 
    toolbar.pauseTimeSlider.oninput(); // set pause time to the pause-time-slider value
    
  

    toolbar.sortButton.onclick = async function() {
        try {
            await visualizer[toolbar.selectedSortingAlgorithm]();
        } catch (error) {
            if (!(error instanceof TypeError)) {
                throw error;
            }
        }
    }
}

main();
