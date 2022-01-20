const defaultColor = 'rgba(66, 134, 244, 0.8)';
const compareColor = 'rgba(78, 216, 96, 0.8)';
const swapColor = 'rgba(219, 57, 57, 0.8)';
const finishedColor = 'rgba(169, 92, 232, 0.8)';
const pivotColor = 'rgba(237, 234, 59, 0.8)';
const pauseTime = 300;

function arrayBars() {
    return document.getElementsByClassName('array-bar');
}

function renderArray(array) {
    let arrayContainer = document.getElementById('array');
    let buffer = ""
    for (var i = 0; i < array.length; i++) {
        buffer += `<div class="array-bar" style="background-color: ${defaultColor}; height: ${array[i]}px"></div>`
    }
    arrayContainer.innerHTML = buffer;
}

async function pause() {
    return new Promise(res => { setTimeout(() => res(), pauseTime); });
} 

async function compare(index1, index2) {
    let bar1Style = arrayBars()[index1].style; let bar2Style = arrayBars()[index2].style;
    let bar1Color = bar1Style.backgroundColor; let bar2Color = bar2Style.backgroundColor;  
    bar1Style.backgroundColor = compareColor; bar2Style.backgroundColor = compareColor;
    await pause();
    bar1Style.backgroundColor = bar1Color; bar2Style.backgroundColor = bar2Color;
}

async function swap(index1, index2) {
    let bar1Style = arrayBars()[index1].style; let bar2Style = arrayBars()[index2].style;
    let bar1Color = bar1Style.backgroundColor; let bar2Color = bar2Style.backgroundColor;  
    bar1Style.backgroundColor = swapColor; bar2Style.backgroundColor = swapColor;
    await pause();
    [bar1Style.height, bar2Style.height] = [bar2Style.height, bar1Style.height]
    await pause(); 
    bar1Style.backgroundColor = bar1Color; bar2Style.backgroundColor = bar2Color;
}

function finished(index) {
    arrayBars()[index].style.backgroundColor = finishedColor;
}

function pivot(index) {
    // change the color of the bar of index to the pivot color
    arrayBars()[index].style.backgroundColor = pivotColor;
}


export {renderArray, compare, swap, finished, pivot}
