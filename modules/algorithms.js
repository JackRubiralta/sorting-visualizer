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

async function heapify(array, n, i) {
    // largest = 'rgba(219, 57, 57, 0.8)'
    // comparingColor = 'rgba(78, 216, 96, 0.8)'
    // swappingColor = 'rgba(219, 57, 57, 0.8)'
    // finishedColor = 'rgba(169, 92, 232, 0.8)'

    await visualizer.setColor(i, 'rgba(219, 57, 57, 0.8)');
	let largest = i; 
	let low = 2 * i + 1;
	let high = 2 * i + 2;

    if (low < n) {
    await visualizer.setColor(low, 'rgba(78, 216, 96, 0.8)');
    await visualizer.pause();
	if (array[low] > array[largest]) {

        await visualizer.clear(largest);
        await visualizer.setColor(low, 'rgba(219, 57, 57, 0.8)');
		largest = low;
	} else { visualizer.clear(low); }
    }

    if (high < n) {
    await visualizer.setColor(high, 'rgba(78, 216, 96, 0.8)');
    await visualizer.pause();
	if (array[high] > array[largest]) {

        await visualizer.clear(largest);
        await visualizer.setColor(high, 'rgba(219, 57, 57, 0.8)');
		largest = high;
	} else { visualizer.clear(high); }
    }

	if (largest != i) {
        await visualizer.setColor(i, 'rgba(219, 57, 57, 0.8)');
        await visualizer.swap(i, largest);
		[array[i], array[largest]] = [array[largest], array[i]];
        await visualizer.clear(i, largest);
		await heapify(array, n, largest);
	} else { await visualizer.clear(i, largest); }
    
}

async function heapSort(array) {
	let n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		await heapify(array, n, i);
	}

	for (let i = n - 1; i > 0; i--) {
		await visualizer.setColor(0, i, 'rgba(219, 57, 57, 0.8)');
		await visualizer.swap(0, i);
		await visualizer.clear(0); await visualizer.setColor(i, 'rgba(169, 92, 232, 0.8)');
		[array[i], array[0]] = [array[0], array[i]];
		
		await heapify(array, i, 0);
	}
}


async function insertionSort(array) { 
    for (let i = 1; i < array.length; i++) {

        await visualizer.setColor(i, 'rgba(219, 57, 57, 0.8)');
        let j = i;
        
        while (j > 0) {


            await visualizer.setColor(j - 1, 'rgba(78, 216, 96, 0.8)'); // set to compareColor
            await visualizer.pause();
            if (array[j] > array[j - 1]) {
                visualizer.clear(j - 1);
                break;
            }

            await visualizer.setColor(j - 1, 'rgba(219, 57, 57, 0.8)');
            await visualizer.swap(j, j - 1);
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            await visualizer.clear(j);
            j--;
        } 
        visualizer.clear(j);
    }
}


function merge(array, low, mid, high) {
    let start2 = mid + 1;
 
    if (array[mid] <= array[start2]) {
        return;
    }
 
    while (low <= mid && start2 <= high) {
         
        if (array[low] <= array[start2]) {
            low++;
        } else {

            
            
            let index = start2;
        
            while (index != low) {
                [array[index], array[index - 1]] = [array[index - 1], array[index]];
                index--;
            } 
 
            
            low++;
            mid++;
            start2++;
        }
    }
}

function mergeSortRecursive(array, low, heigh) {
    if (low < heigh) { 
        let mid = Math.floor((low + heigh) / 2);	
        mergeSortRecursive(array, low, mid); 
        mergeSortRecursive(array, mid + 1, heigh); 
        merge(array, low, mid, heigh); 
    }
}

function mergeSort(array) {
    mergeSortRecursive(array, 0, array.length - 1);
}

export {generateArray, selectionSort, bubbleSort, quickSort, heapSort, insertionSort};
