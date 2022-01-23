import * as visualizer from './visualizer.js';


function generateArray(min, max, size, array) {
    array.length = 0;    
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min) ) + min);
    }
    visualizer.renderArray(array);
}

async function selectionSort(array) {
    // minIndexColor = 'rgba(219, 57, 57, 0.8)'
    // comparingColor = 'rgba(78, 216, 96, 0.8)'
    // swappingColor = 'rgba(219, 57, 57, 0.8)'
    // finishedColor = 'rgba(169, 92, 232, 0.8)'
    let minIndex;

    for (let i = 0; i < array.length; i++) { 
        
        // setting minIndex to i
        await visualizer.setColor(i, 'rgba(219, 57, 57, 0.8)'); // set i to the minIndex color
        minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) { 
            
            // comparing minIndex and j
            await visualizer.setColor(j, 'rgba(78, 216, 96, 0.8)'); // set j to the comparingColor
            await visualizer.pause(); // comparing pause  
            if (array[minIndex] > array[j]) {
                
                // setting minIndex to j
                await visualizer.clear(minIndex); // clear minIndex color because its getting replaced
                await visualizer.setColor(j, 'rgba(219, 57, 57, 0.8)'); // j becomes new minIndex so we set it to the minIndexColor
                minIndex = j;

            } else { await visualizer.clear(j) } // if j does not become minIndex we clear its color
        }

        // swapping i and minIndex
        await visualizer.setColor(i, 'rgba(219, 57, 57, 0.8)'); // set the color of i to swappingColor
        //await visualizer.setColor(minIndex, 'rgba(78, 216, 96, 0.8)'); dont need because swappingColor = minIndexColor 
        await visualizer.swap(minIndex, i); // swap the elements of minIndex and i
        [array[minIndex], array[i]] = [array[i], array[minIndex]];  
        await visualizer.clear(minIndex); // clear color at minIndex
        await visualizer.setColor(i, 'rgba(169, 92, 232, 0.8)'); // set i to the finishedColor
    }
}

async function bubbleSort(array) {
    // comparingColor = 'rgba(78, 216, 96, 0.8)'
    // swappingColor = 'rgba(219, 57, 57, 0.8)'
    // finishedColor = 'rgba(169, 92, 232, 0.8)'

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < (array.length - i - 1); j++) {

            // comparing j and j + 1
            await visualizer.setColor(j, j + 1, 'rgba(78, 216, 96, 0.8)'); // set color j and j + 1 to the comparingColor
            await visualizer.pause(); // comparing pause  
            if (array[j] > array[j + 1]) {

                // swapping j and j + 1
                await visualizer.setColor(j, j + 1, 'rgba(219, 57, 57, 0.8)'); // set color j and j + 1 to the swappingColor
                await visualizer.swap(j, j + 1);
                [array[j + 1], array[j]] = [array[j], array[j + 1]]; 
                await visualizer.clear(j); // clear j only because j + 1 color is changes next iteration
            
            } else { visualizer.clear(j) } // clear j
        }

        await visualizer.setColor(array.length - i - 1, 'rgba(169, 92, 232, 0.8)'); // set array.length - i - 1 to the finishedColor
    }
}

async function partition(array, low, high) { // maybe make hight = pivot
    // pivotColor = 'rgba(237, 234, 59, 0.8)'
    // comparing color = 'rgba(78, 216, 96, 0.8)'
    // swappingColor = 'rgba(219, 57, 57, 0.8)'
    // finishedColor = 'rgba(169, 92, 232, 0.8)'

    // setting pivot
    await visualizer.setColor(low, 'rgba(237, 234, 59, 0.8)'); 
    let pivot = array[low];
    
    let i = low; // might want to be i + 1 bc visualgo is like that

    for (let j = low + 1; j <= high; ++j) { 
        
        // comparing j and pivot
        await visualizer.setColor(j, 'rgba(78, 216, 96, 0.8)');
        await visualizer.pause(); // comparing pause  
        if (array[j] < pivot)  { 
            i = i + 1;

            // swapping j and i
            await visualizer.setColor(j, 'rgba(219, 57, 57, 0.8)');
            await visualizer.swap(j, i);
            await visualizer.setColor(i, 'turquoise'); // we set color to i because i and j were swapped
            [array[j], array[i]] = [array[i], array[j]]; 
        } else { await visualizer.setColor(j, 'pink') }
    }
    
    // swapping pivot and i
    await visualizer.swap(low, i);
    [array[low], array[i]] = [array[i], array[low]];
    await visualizer.setColor(i, 'rgba(169, 92, 232, 0.8)'); // set i to the finishedColor

    await visualizer.clearRange(low, i - 1); await visualizer.clearRange(i + 1, high);
    return i; 
}
  
async function quickSortRecursive(array, low, high) {
    if (low < high) {
        let pivotIndex = await partition(array, low, high);
        await Promise.all([
            quickSortRecursive(array, low, pivotIndex - 1),
            quickSortRecursive(array, pivotIndex + 1, high)
        ]);
    }
}

async function quickSort(array) {
    await quickSortRecursive(array, 0, array.length - 1);
}

export {generateArray, selectionSort, bubbleSort, quickSort};
