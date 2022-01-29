// singleton patterns used here
// IDEA MAKE THIS A DEFAULT EXPORT
// and have visual.buffer.setColor(i, colors.defaultColor) and visual.array.setColor
// visual.render(array)

const colors = {
    defaultColor: 'CornflowerBlue', 
    defaultBufferColor: 'Silver', // skyBlue
    primaryColor: 'IndianRed',
    secondaryColor: 'LightGreen',
    pivotColor: 'Khaki',
    highlighColor1: 'Turquoise',
    highlighColor2: 'Pink',
    finishedColor: 'MediumOrchid',
}

function calculateMargin(size) {
    return 120 / size;
}
function calculateWidth(size) { // have step in size
    return 900 / size;
}
// maybe have array be here
const arrayVisual = {
    /**
     * Creates bars for each element in the array given.
     * @param {array} array - List of heights of the bars to be rendered.
     */
    render(array) {
        let arrayBars = '';
        for (let i = 0; i < array.length; i++) {
            arrayBars += `<div class='bar' style='background-color: ${colors.defaultColor}; height: ${array[i]}px; width: ${calculateWidth(array.length)}px; margin: 0 ${calculateMargin(array.length)}px'></div>`;
        }
        document.getElementById('array').innerHTML = arrayBars;
    },

    /**
     * Revert the color of a bar to the default color. 
     * @param {number} index - Index of the bar.
     */
    revertColor(index) {
        document.getElementById('array').querySelectorAll('.bar')[index].style.backgroundColor = colors.defaultColor;
    },

    /** Sets the colors to defaultColor of the elements from start to stop excluding start */
    revertRange(start, stop) {
        for (let index = start; index <= stop; index++) {
            this.revertColor(index);
        }
    },


    /**
     * Change the color of many bars at different indexes. 
     * @param {number} index - The index of the bar.
     * @param {string} - The new color of the bar. 
     */
    setColor(index, color) {
        document.getElementById('array').querySelectorAll('.bar')[index].style.backgroundColor = color;
    },


    /** 
     * Change the height of a bar given a index. 
     * @param {number} index - The index of the bar.
     * @param {number} height - The new height of the bar.
     */
    setHeight(index, height) {
        document.getElementById('array').querySelectorAll('.bar')[index].style.height = `${height}px`;
    },


    /** 
     * Swaps the heights and colors of 2 bars and pauses before and after swapping.
     * @param {number} index1 - The index of first bar.
     * @param {number} index2 - The index of second bar.
    */
    swap(index1, index2) {
        let bar1 = document.getElementById('array').querySelectorAll('.bar')[index1].style;
        let bar2 = document.getElementById('array').querySelectorAll('.bar')[index2].style;
        [bar1.height, bar1.backgroundColor, bar2.height, bar2.backgroundColor] = [bar2.height, bar2.backgroundColor, bar1.height, bar1.backgroundColor];
    }
}

const bufferVisual = {
    /**
     * Creates the buffer bars.
     * @param {size} size - Amount of bars rendered.
     */
    render(size) {
        let bufferBars = '';
        for (let i = 0; i < size; i++) {
            bufferBars += `<div class='bar' style='width: ${calculateWidth(size)}px; margin: 0 ${calculateMargin(size)}px; height: 0px'></div>`;
        }
        document.getElementById('buffer').innerHTML = bufferBars;
    },

    setColor(index, color) {
        document.getElementById('buffer').querySelectorAll('.bar')[index].style.backgroundColor = color;
    },

    setHeight(index, height) {
        document.getElementById('buffer').querySelectorAll('.bar')[index].style.height = `${height}px`;
    },

    revertColor(index) {
        document.getElementById('buffer').querySelectorAll('.bar')[index].style.backgroundColor = colors.defaultBufferColor;
    },


    createBar(index, height, color = colors.defaultBufferColor) {
        this.setColor(index, color);
        this.setHeight(index, height);
    },


    deleteBar(index) {
        this.setHeight(index, 0);
    }
}

/**
 * Delay code for pauseTime, must be called with await and used for animation.
 */
async function pause() {
    return new Promise(res => { setTimeout(() => res(), pause.pauseTime); });
}

pause.setPauseTime = (ms) => {
    pause.pauseTime = ms;
    let rules = document.styleSheets[0].cssRules; 
    
    rules[1].style.transitionDuration = `${ms}ms`;
    
    //(`.bar { transition-duration: ${ms*10}ms; }`, 0);
}

export {arrayVisual, bufferVisual, colors, pause}