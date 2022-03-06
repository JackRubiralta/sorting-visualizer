const arrayBarsContainer = document.getElementById('array-bars'); const auxiliaryBarsContainer = document.getElementById('auxiliary-bars');
var arrayBars = arrayBarsContainer.querySelectorAll('.bar');
var auxiliaryBars = auxiliaryBarsContainer.querySelectorAll('.bar');

/**
 * Renders the bar elements into the containers given an array. 
 * @param {number[]} array 
 */
function render(array) {
    
   

    auxiliaryBarsContainer.innerHTML = ''; arrayBarsContainer.innerHTML = '';
    let width = 900 / array.length;
    let margin = 120 / array.length;
    for (let height of array) {
        auxiliaryBarsContainer.innerHTML += `<div class='bar hidden' style='width: ${width}px; margin: 0 ${margin}px;'></div>`;
        arrayBarsContainer.innerHTML += `<div class='bar default' style='width: ${width}px; margin: 0 ${margin}px; height: ${height}%;'></div>`;
    }
    arrayBars = arrayBarsContainer.querySelectorAll('.bar');
    auxiliaryBars = auxiliaryBarsContainer.querySelectorAll('.bar');
}

/**
 * Set the visual of a bar to a visual given that is defined in the visual.css file.
 * @param {number} index - The index of the bar.
 * @param {string} visual - New visual class defined in the visual.css file.
 */
function setBarVisual(index, visual) { let classList = arrayBars[index].classList; classList.replace(classList[1], visual); }

/**
 * 
 * @param {number} start 
 * @param {number} stop 
 * @param {number} visual 
 */
function setBarRangeVisual(start, stop, visual) { for (let index = start; index <= stop; index++) { setBarVisual(index, visual); } }

/** 
 * Change the height of a bar given a index. 
 * @param {number} index - The index of the bar.
 * @param {number} height - The height of the bar.
 */
function setBarHeight(index, height) { arrayBars[index].style.height = `${height}%`; }
 
/** 
 * Swaps the visuals of 2 bars.
 * @param {number} index1 - The index of first bar.
 * @param {number} index2 - The index of second bar.
 */
function swapBarVisuals(index1, index2) { let bar1Visual = arrayBars[index1].classList[1]; let bar2Visual = arrayBars[index2].classList[1]; setBarVisual(index1, bar2Visual); setBarVisual(index2, bar1Visual); }
 
/** 
 * Swaps the heights of 2 bars.
 * @param {number} index1 - The index of first bar.
 * @param {number} index2 - The index of second bar.
 */
function swapBarHeights(index1, index2) { let bar1 = arrayBars[index1].style; let bar2 = arrayBars[index2].style; [bar1.height, bar2.height] = [bar2.height, bar1.height]; }
 
/**
 * Set the visual of a bar to a visual given that is defined in the visual.css file.
 * @param {number} index - The index of the bar.
 * @param {string} visual - New visual class defined in the visual.css file.
 */
function setAuxiliaryBarVisual(index, visual) { let classList = auxiliaryBars[index].classList; classList.replace(classList[1], visual); }
 
/** 
 * Change the height of a bar given a index. 
 * @param {number} index - The index of the bar.
 * @param {number} height - The height of the bar.
 */
function setAuxiliaryBarHeight(index, height) { auxiliaryBars[index].style.height = `${height}%`; }

export default { render, setBarVisual, setBarRangeVisual, setBarHeight, swapBarVisuals, swapBarHeights, setAuxiliaryBarHeight, setAuxiliaryBarVisual };
 