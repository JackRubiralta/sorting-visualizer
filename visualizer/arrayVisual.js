export default {
    /**
     * Renders the bar elements into the containers given an array. 
     * @param {number[]} array 
     */
    render(array) {
        let auxiliaryBars = '';
        let arrayBars = '';
        let width = 900 / array.length;
        let margin = 120 / array.length;
        for (let height of array) {
            auxiliaryBars += `<div class='bar hidden' style='width: ${width}px; margin: 0 ${margin}px;'></div>`;
            arrayBars += `<div class='bar default' style='width: ${width}px; margin: 0 ${margin}px; height: ${height}%;'></div>`;
        }
        document.getElementById('array-bars').innerHTML = arrayBars;
        document.getElementById('auxiliary-bars').innerHTML = auxiliaryBars;
    },

    /**
     * Set the visual of a bar to a visual given that is defined in the visual.css file.
     * @param {number} index - The index of the bar.
     * @param {string} visual - New visual class defined in the visual.css file.
     */
    setBarVisual(index, visual) {
        let classList = document.getElementById('array-bars').querySelectorAll('.bar')[index].classList;
        classList.replace(classList[1], visual);
    },

    setBarRangeVisual(start, stop, visual) {
        for (let index = start; index <= stop; index++) {
            this.setBarVisual(index, visual);
        }
    },

    /** 
     * Change the height of a bar given a index. 
     * @param {number} index - The index of the bar.
     * @param {number} height - The height of the bar.
     */
    setBarHeight(index, height) {
        document.getElementById('array-bars').querySelectorAll('.bar')[index].style.height = `${height}%`;
    },

    /** 
     * Swaps the visuals of 2 bars.
     * @param {number} index1 - The index of first bar.
     * @param {number} index2 - The index of second bar.
    */
    swapBarVisuals(index1, index2) {
        let bar1Visual = document.getElementById('array-bars').querySelectorAll('.bar')[index1].classList[1];
        let bar2Visual = document.getElementById('array-bars').querySelectorAll('.bar')[index2].classList[1];
        this.setBarVisual(index1, bar2Visual); this.setBarVisual(index2, bar1Visual);
    },

    /** 
     * Swaps the heights of 2 bars.
     * @param {number} index1 - The index of first bar.
     * @param {number} index2 - The index of second bar.
    */
    swapBarHeights(index1, index2) {
        let bar1 = document.getElementById('array-bars').querySelectorAll('.bar')[index1].style;
        let bar2 = document.getElementById('array-bars').querySelectorAll('.bar')[index2].style;
        [bar1.height, bar2.height] = [bar2.height, bar1.height];
    },

    /**
     * Set the visual of a bar to a visual given that is defined in the visual.css file.
     * @param {number} index - The index of the bar.
     * @param {string} visual - New visual class defined in the visual.css file.
     */
    setAuxiliaryBarVisual(index, visual) {
        let classList = document.getElementById('auxiliary-bars').querySelectorAll('.bar')[index].classList;
        classList.replace(classList[1], visual);
    },

    /** 
     * Change the height of a bar given a index. 
     * @param {number} index - The index of the bar.
     * @param {number} height - The height of the bar.
     */
    setAuxiliaryBarHeight(index, height) {
        document.getElementById('auxiliary-bars').querySelectorAll('.bar')[index].style.height = `${height}%`;
    },
}

 
/*
arrayVisual.pause()


have all of these function is just visualizer and rest default export
also get meduim accouts
*/
