const defaultColor = 'rgba(66, 134, 244, 0.8)';
const pauseTime = 200;

function arrayBar(index) { return document.getElementsByClassName('array-bar')[index].style; }

function renderArray(array) {
    let buffer = "";
    for (var i = 0; i < array.length; i++) { buffer += `<div class="array-bar" style="background-color: ${defaultColor}; height: ${array[i]}px"></div>`; }
    document.getElementById('array').innerHTML = buffer;
}

async function sleep(ms) { return new Promise(res => { setTimeout(() => res(), ms); }); }
async function pause() { await sleep(pauseTime); }

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
    await pause(); // can have without sometimes: do testing
}

export {renderArray, swap, setColor, pause, clear, clearRange}