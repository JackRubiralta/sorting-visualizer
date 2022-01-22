const defaultColor = 'rgba(66, 134, 244, 0.8)';
const swapColor = 'rgba(219, 57, 57, 0.8)';
const finishedColor = 'rgba(169, 92, 232, 0.8)';

import {sleep, arrayBar} from './utils.js';

async function pause() { await sleep(300); }

/* Deprecated, replaced with new one 
function setColor(index, color) { arrayBar(index).backgroundColor = color; }
*/

function setColor(...args) {
    let color = args.pop(-1);
    args.forEach((index) => {arrayBar(index).backgroundColor = color; });
}

function clear(...args) { args.forEach((index) => {arrayBar(index).backgroundColor = defaultColor; }); }

/** Sets the colors to defaultColor of the elements from start to stop excluding start */
function clearRange(start, stop) {
    for (let index = start; index <= stop; index++) {
        clear(index);
    }
}
    

/** Swaps elements of 2 indexes and pauses before and after swapping. */
async function swap(index1, index2) {
    let bar1 = arrayBar(index1); let bar2 = arrayBar(index2);
    await pause();
    [bar1.height, bar1.backgroundColor, bar2.height, bar2.backgroundColor] = [bar2.height, bar2.backgroundColor, bar1.height, bar1.backgroundColor];
    await pause();
}

function finished(index) {
    setColor(index, finishedColor);
}








function renderArray(array) {
    let buffer = "";
    for (var i = 0; i < array.length; i++) {
        buffer += `<div class="array-bar" style="background-color: ${defaultColor}; height: ${array[i]}px"></div>`;
    }
    document.getElementById('array').innerHTML = buffer;
}

export {renderArray, swap, finished, setColor, pause, clear, clearRange}
