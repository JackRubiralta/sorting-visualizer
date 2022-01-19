const defaultColor = 'turquoise';
const compareColor = 'green';
const finishedColor = 'purple';
const swapColor = 'red';
const pivotColor = 'yellow';
const pauseTime = 1000;

export function arrayBars() {
    return document.getElementsByClassName('array-bar');
}

export function render(array) {
    let arrayContainer = document.getElementById('array');
    let buffer = ""
    for (var i = 0; i < array.length; i++) {
        buffer += `<div class="array-bar" style="background-color: ${defaultColor}; height: ${array[i]}px"></div>`
    }
    arrayContainer.innerHTML = buffer;
}

// change the colors of 2 bars to the comparing color then pause and revert to the original color
export async function compare(index1, index2) {
    let bar1Style = arrayBars()[index1].style;
    let bar2Style = arrayBars()[index2].style;

    // save the previous colors
    let bar1Color = bar1Style.backgroundColor;
    let bar2Color = bar2Style.backgroundColor;  

    await delay(pauseTime); // sleep for 1 second

    // change the colors to the comparing color
    bar1Style.backgroundColor = compareColor;
    bar2Style.backgroundColor = compareColor;
    await delay(pauseTime);  //sleep for 1 second

    // change the colors back to their original colors
    bar1Style.backgroundColor = bar1Color;
    bar2Style.backgroundColor = bar2Color;
}

// change the colors of 2 bars to the swapping color and swap
export async function swap(index1, index2) {
    let bar1Style = arrayBars()[index1].style;
    let bar2Style = arrayBars()[index2].style;

    // save the previous colors
    let bar1Color = bar1Style.backgroundColor;
    let bar2Color = bar2Style.backgroundColor;  
    
    // change the colors to the comparing color
    bar1Style.backgroundColor = swapColor;
    bar2Style.backgroundColor = swapColor;
    
    // swap the heights of the bars
    await delay(pauseTime);
    let bar1height = bar1Style.height;
    let bar2height = bar2Style.height;
    bar1Style.height = bar2height;
    bar2Style.height = bar1height;
    await delay(pauseTime); 

    // change the colors back to their original colors
    bar1Style.backgroundColor = bar1Color;
    bar2Style.backgroundColor = bar2Color;
}

// change the colors a bar to the finished color
export function finished(index) {
    // change the color of the bar of index to the finished color
    arrayBars()[index].style.backgroundColor = finishedColor;
}

// change the colors a bar to the pivot color
export function pivot(index) {
    // change the color of the bar of index to the pivot color
    arrayBars()[index].style.backgroundColor = pivotColor;
}


function delay(time) {
    return new Promise(res => {
      setTimeout(() => res(), time);
    });
  }

