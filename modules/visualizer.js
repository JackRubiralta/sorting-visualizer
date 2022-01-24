const defaultColor = 'rgba(66, 134, 244, 0.8)';
const pauseTime = 10;

function arrayBar(index) { return document.getElementById('array').querySelectorAll('.array-bar')[index].style; }
function bufferBar(index) { return document.getElementById('buffer').querySelectorAll('.array-bar')[index].style; }

function renderArray(array) {
    let arrayBars = '';
    let bufferBars = '';
    for (var i = 0; i < array.length; i++) { arrayBars += `<div class="array-bar" style="background-color: ${defaultColor}; height: ${array[i]}px"></div>`; }
    for (var i = 0; i < array.length; i++) { bufferBars += `<div class="array-bar" style="background-color: ${defaultColor}; height: 0px"></div>`; }
    document.getElementById('array').innerHTML = arrayBars;
    document.getElementById('buffer').innerHTML = bufferBars;
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
 
async function setHeight(index, height) {
    arrayBar(index).height = `${height}px`;
}



/** Swaps elements of 2 indexes and pauses before and after swapping. */
async function swap(index1, index2) {
    let bar1 = arrayBar(index1); let bar2 = arrayBar(index2);
    await pause();
    [bar1.height, bar1.backgroundColor, bar2.height, bar2.backgroundColor] = [bar2.height, bar2.backgroundColor, bar1.height, bar1.backgroundColor];
    await pause(); // can have without sometimes: do testing
}


// 1832 novemnber 11th

// BUFFER FUNCTIONS
var buffer = { // used for quicksort
    defaultColor: 3,

    setBarHeight: function(index, height) {
        bufferBar(index).height = `${height}px`;
    },

    setBarColor: function(index, color) {
        bufferBar(index).backgroundColor = color;
    },

    clearBarColor: function(index) {
        bufferBar(index).backgroundColor = 'silver';
    },

    createBar: function(index, height, color) { // make color independen
        this.setBarColor(index, color);
        this.setBarHeight(index, height);
    },

    deleteBar: function(index) {
        this.setBarHeight(index, 0);
    },
}

export {renderArray, swap, setColor, pause, clear, clearRange, setHeight, buffer};



