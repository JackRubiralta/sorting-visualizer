import {arrayVisual, bufferVisual, colors, pause} from './modules/visualizer.js';

async function selectionSort(array) {
    let minIndex;

    for (let i = 0; i < array.length; i++) { 
        
        // Setting minIndex to i
        arrayVisual.setColor(i, colors.primaryColor); // Set minIndex to the primary color
        minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) { 
            
            // Comparing minIndex and j
            arrayVisual.setColor(j, colors.secondaryColor); // set j to the comparingColor
            await pause(); // comparing pause  
            if (array[minIndex] > array[j]) {
                
                // setting minIndex to j
                arrayVisual.revertColor(minIndex); // revertColor minIndex color because its getting replaced
                arrayVisual.setColor(j, colors.primaryColor); // j becomes new minIndex so we set it to the minIndexColor
                minIndex = j;

            } else { arrayVisual.revertColor(j) } // j is not new minIndex so the color is reverted
        }

        // swapping i and minIndex
        arrayVisual.setColor(i, colors.primaryColor); // set the color of i to swappingColor
        await pause();
        arrayVisual.swap(minIndex, i); // swapBars the elements of minIndex and i
        await pause();
        [array[minIndex], array[i]] = [array[i], array[minIndex]];  
        arrayVisual.revertColor(minIndex); // revertColor color at minIndex
        arrayVisual.setColor(i, colors.finishedColor); // set i to the finishedColor

    }
}


async function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {

            // Comparing j and j + 1
            arrayVisual.setColor(j, colors.secondaryColor); arrayVisual.setColor(j + 1, colors.secondaryColor);
            await pause(); // comparing pause  
            if (array[j] > array[j + 1]) {

                // Swapping j and j + 1
                arrayVisual.setColor(j, colors.primaryColor); arrayVisual.setColor(j + 1, colors.primaryColor);
                await pause();
                arrayVisual.swap(j, j + 1);
                await pause();
                [array[j + 1], array[j]] = [array[j], array[j + 1]]; 
                arrayVisual.revertColor(j);
            
            } else { arrayVisual.revertColor(j) } 
        }
        arrayVisual.setColor(array.length - i - 1, colors.finishedColor);
    }
}


async function partition(array, low, high) {
    arrayVisual.setColor(low, colors.pivotColor); 
    let pivot = array[low];
    
    let i = low;

    for (let j = low + 1; j <= high; ++j) { 
        
        // Comparing j and pivot
        arrayVisual.setColor(j, colors.secondaryColor);
        await pause();
        if (array[j] < pivot)  { 
            i++;

            // Swapping j and i
            arrayVisual.setColor(j, colors.primaryColor);
            await pause();
            arrayVisual.swap(j, i);
            await pause();
            arrayVisual.setColor(i, colors.highlighColor1); 
            [array[j], array[i]] = [array[i], array[j]]; 
        } else { arrayVisual.setColor(j, colors.highlighColor2) }
    }
    
    // Swapping pivot and i
    await pause();
    arrayVisual.swap(low, i);
    await pause();

    [array[low], array[i]] = [array[i], array[low]];
    arrayVisual.setColor(i, colors.finishedColor);

    arrayVisual.revertRange(low, i - 1);
    arrayVisual.revertRange(i + 1, high);
    return i; 
}
  
async function quickSortRecursive(array, low, high) {
    if (low < high) {
        let pivotIndex = await partition(array, low, high);
        /*await Promise.all([
            quickSortRecursive(array, low, pivotIndex - 1),
            quickSortRecursive(array, pivotIndex + 1, high)
        ]);*/
        await quickSortRecursive(array, low, pivotIndex - 1);
        await quickSortRecursive(array, pivotIndex + 1, high);
    }
}

async function quickSort(array) {
    await quickSortRecursive(array, 0, array.length - 1);
}


async function heapify(array, n, i) {
    arrayVisual.setColor(i, colors.primaryColor);
	let largest = i; 
	let low = 2 * i + 1;
	let high = 2 * i + 2;

    if (low < n) {
        arrayVisual.setColor(low, colors.secondaryColor);
        await pause();
        if (array[low] > array[largest]) {

            arrayVisual.revertColor(largest);
            arrayVisual.setColor(low, colors.primaryColor);
            largest = low;
	    } else { arrayVisual.revertColor(low); }
    }

    if (high < n) {
        arrayVisual.setColor(high, colors.secondaryColor);
        await pause();
        if (array[high] > array[largest]) {

            arrayVisual.revertColor(largest);
            arrayVisual.setColor(high, colors.primaryColor);
            largest = high;
        } else { arrayVisual.revertColor(high); }
    }

	if (largest != i) {
        arrayVisual.setColor(i, colors.primaryColor);
        await pause();
        arrayVisual.swap(i, largest);
        await pause();

		[array[i], array[largest]] = [array[largest], array[i]];
        arrayVisual.revertColor(i, largest);
		await heapify(array, n, largest);
	} else { arrayVisual.revertColor(i, largest); }
    
}

async function heapSort(array) {
	let n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		await heapify(array, n, i);
	}

	for (let i = n - 1; i > 0; i--) {
		arrayVisual.setColor(0, i, colors.primaryColor);
        await pause();
		arrayVisual.swap(0, i);
        [array[i], array[0]] = [array[0], array[i]];
        await pause();
		arrayVisual.revertColor(0);
        arrayVisual.setColor(i, colors.finishedColor);
		await heapify(array, i, 0);
	}
}


async function insertionSort(array) { 
    for (let i = 1; i < array.length; i++) {

        arrayVisual.setColor(i, colors.primaryColor);
        let j = i;
        
        while (j > 0) {

            arrayVisual.setColor(j - 1, colors.secondaryColor);
            await pause();
            if (array[j] > array[j - 1]) {
                arrayVisual.revertColor(j - 1);
                break;
            }

            arrayVisual.setColor(j - 1, colors.primaryColor);
            await pause();
            arrayVisual.swap(j, j - 1);
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            await pause();
            arrayVisual.revertColor(j);
            j--;
        } 
        arrayVisual.revertColor(j);
    }
}


async function merge(array, low, mid, high) {
    let buffer = [];
    buffer.length = high - low + 1;; 

    let left = low
    let right = mid + 1;
    let bufferIndex = 0;
    arrayVisual.setColor(left, colors.secondaryColor);
    arrayVisual.setColor(left, colors.secondaryColor);

    while (true) { 

        await pause(); 
        if (array[left] <= array[right]) {
            arrayVisual.setColor(left, colors.primaryColor);
            bufferVisual.createBar(low + bufferIndex, array[left], colors.primaryColor);
            await pause();
            buffer[bufferIndex] = array[left];
            await bufferVisual.revertColor(low + bufferIndex);
            await arrayVisual.revertColor(left);

            left++; if (!(left <= mid)) { arrayVisual.revertColor(right); break; }
            arrayVisual.setColor(left, colors.secondaryColor); 
            
        } else {
            arrayVisual.setColor(right, colors.primaryColor);
            bufferVisual.createBar(low + bufferIndex, array[right], colors.primaryColor);
            await pause();
            buffer[bufferIndex] = array[right]; 
            bufferVisual.revertColor(low + bufferIndex);
            arrayVisual.revertColor(right);

            right++; if (!(right <= high)) { arrayVisual.revertColor(left); break; }
            arrayVisual.setColor(right, colors.secondaryColor);
        } 
        bufferIndex++;     
    }
    bufferIndex++;


    while (left <= mid) { 
        arrayVisual.setColor(left, colors.primaryColor);
        bufferVisual.createBar(low + bufferIndex, array[left], colors.primaryColor);
        await pause();
        buffer[bufferIndex] = array[left];
        bufferVisual.revertColor(low + bufferIndex);
        arrayVisual.revertColor(left);

        left++; bufferIndex++;
    } 

    while (right <= high) { 
        arrayVisual.setColor(right, colors.primaryColor);
        bufferVisual.createBar(low + bufferIndex, array[right], colors.primaryColor);
        await pause();
        buffer[bufferIndex] = array[right];
        bufferVisual.revertColor(low + bufferIndex);
        arrayVisual.revertColor(right);
        right++; bufferIndex++;
    }
    
    for (let k = 0; k < high - low + 1; k++) { 
        bufferVisual.setColor(low + k, colors.primaryColor);
        arrayVisual.setColor(low + k, colors.primaryColor);
        array[low + k] = buffer[k];
        await pause();
        arrayVisual.setHeight(low + k, buffer[k]);
        arrayVisual.revertColor(low + k);
        bufferVisual.deleteBar(low + k);
    }    
}

async function mergeSortRecursive(array, low, heigh) {
    if (low < heigh) { 
        let mid = Math.floor((low + heigh) / 2);	
        await mergeSortRecursive(array, low, mid); 
        await mergeSortRecursive(array, mid + 1, heigh); 
        await merge(array, low, mid, heigh); 
    }
}

async function mergeSort(array) {
    await mergeSortRecursive(array, 0, array.length - 1);
}

export {selectionSort, bubbleSort, quickSort, heapSort, insertionSort, mergeSort};
