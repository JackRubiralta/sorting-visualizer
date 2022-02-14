import arrayVisual from './arrayVisual/arrayVisual.js';

/**
 * @type {number}
 * Defines the pause time of the pause function in milliseconds.
 */
var pauseTime = null;

function setPauseTime(ms) {
    pauseTime = ms;
} 

/**
 * Delay code for pauseTime, must be called with await and used for animation.
 */
async function pause() {
    return new Promise(res => { setTimeout(() => res(), pauseTime); });
}


/**
 * @type {number[]}
 */
var array;

function generateArray(length) {
    let min = 20;
    let max = 100;
    array = Array.from({length: length}, () => Math.floor(Math.random() * (max - min) ) + min);
    arrayVisual.render(array);
} 

/**
 * Selection Sort animation function.
 */
async function selectionSort() {
    let minIndex;

    for (let i = 0; i < array.length; i++) { 
        
        arrayVisual.setBarVisual(i, 'primary'); 
        minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) { 
            
            arrayVisual.setBarVisual(j, 'secondary'); 
            await pause(); // comparing pause  
            if (array[minIndex] > array[j]) {
                
                arrayVisual.setBarVisual(minIndex, 'default'); 
                arrayVisual.setBarVisual(j, 'primary'); 
                minIndex = j;

            } else { arrayVisual.setBarVisual(j, 'default'); } 
        }

        arrayVisual.setBarVisual(i, 'primary');
        await pause(); // swapping pause
        arrayVisual.swapBarHeights(minIndex, i); 
        [array[minIndex], array[i]] = [array[i], array[minIndex]];  
        await pause(); // swapping pause
        arrayVisual.setBarVisual(minIndex, 'default'); 
        arrayVisual.setBarVisual(i, 'finished'); 
    }
}


async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {

            // Comparing j and j + 1
            arrayVisual.setBarVisual(j, 'secondary');
            arrayVisual.setBarVisual(j + 1, 'secondary');
            await pause(); // comparing pause  
            if (array[j] > array[j + 1]) {

                // Swapping j and j + 1
                arrayVisual.setBarVisual(j, 'primary'); arrayVisual.setBarVisual(j + 1, 'primary');
                await pause();
                arrayVisual.swapBarHeights(j, j + 1);
                await pause();
                [array[j + 1], array[j]] = [array[j], array[j + 1]]; 
            }
            arrayVisual.setBarVisual(j, 'default'); 
        }
        arrayVisual.setBarVisual(array.length - i - 1, 'finished');
    }
}



async function quickSort() {
    async function quickSortRecursive(low, high) {
        async function partition(low, high) {
            arrayVisual.setBarVisual(low, 'pivot'); 
            let pivot = array[low];
            
            let i = low;
    
            for (let j = low + 1; j <= high; ++j) { 
                
                // Comparing j and pivot
                arrayVisual.setBarVisual(j, 'secondary');
                await pause();
                if (array[j] < pivot)  { 
                    i++;
    
                    // Swapping j and i
                    arrayVisual.setBarVisual(j, 'primary');
                    await pause();
                    arrayVisual.swapBarHeights(j, i); arrayVisual.swapBarVisuals(j, i);
                    [array[j], array[i]] = [array[i], array[j]]; 
                    await pause();
    
                    arrayVisual.setBarVisual(i, 'smaller'); 
    
                } else { arrayVisual.setBarVisual(j, 'larger'); }
            }
            
            // Swapping pivot and i
            await pause();
            arrayVisual.swapBarHeights(low, i); arrayVisual.swapBarVisuals(low, i);
            [array[low], array[i]] = [array[i], array[low]];
            await pause();
    
            arrayVisual.setBarVisual(i, 'finished');
            arrayVisual.setBarRangeVisual(low, i - 1, 'default');
            arrayVisual.setBarRangeVisual(i + 1, high, 'default');
            return i; 
        }

        if (low < high) {
            let pivotIndex = await partition(low, high);
            await pause();

            /*await Promise.all([
                quickSortRecursive(array, low, pivotIndex - 1),
                quickSortRecursive(array, pivotIndex + 1, high)
            ]);*/
            await quickSortRecursive(low, pivotIndex - 1);
            await quickSortRecursive(pivotIndex + 1, high);
        } else { arrayVisual.setBarVisual(low, 'finished'); }
    }

    await quickSortRecursive(0, array.length - 1);
}




async function heapSort() {

    async function heapify(n, i) {
        arrayVisual.setBarVisual(i, 'primary');
        let largest = i; 
        let low = 2 * i + 1;
        let high = 2 * i + 2;
    
        if (low < n) {
            arrayVisual.setBarVisual(low, 'secondary');
            await pause();
            if (array[low] > array[largest]) {
    
                arrayVisual.setBarVisual(largest, 'default');
                arrayVisual.setBarVisual(low, 'primary');
                largest = low;
            } else { arrayVisual.setBarVisual(low, 'default'); }
        }
    
        if (high < n) {
            arrayVisual.setBarVisual(high, 'secondary');
            await pause();
            if (array[high] > array[largest]) {
    
                arrayVisual.setBarVisual(largest, 'default');
                arrayVisual.setBarVisual(high, 'primary');
                largest = high;
            } else { arrayVisual.setBarVisual(high, 'default'); }
        }
    
        if (largest != i) {
            arrayVisual.setBarVisual(i, 'primary');
            await pause();
            arrayVisual.swapBarHeights(i, largest);
            [array[i], array[largest]] = [array[largest], array[i]];
            await pause();
    
            arrayVisual.setBarVisual(largest, 'default');
            arrayVisual.setBarVisual(i, 'default');
            await heapify(n, largest);
        } else { arrayVisual.setBarVisual(largest, 'default'); arrayVisual.setBarVisual(i, 'default'); }
        
    }


	for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
		await heapify(array.length, i);
	}

	for (let i = array.length - 1; i > 0; i--) {
		arrayVisual.setBarVisual(i, 'primary');
        arrayVisual.setBarVisual(0, 'primary')
        
        await pause();
		arrayVisual.swapBarHeights(0, i);
        [array[i], array[0]] = [array[0], array[i]];
        await pause();

		arrayVisual.setBarVisual(0, 'default');
        arrayVisual.setBarVisual(i, 'finished');
		await heapify(i, 0);
	}
    arrayVisual.setBarVisual(0, 'finished');
}


async function insertionSort() { 
    for (let i = 1; i < array.length; i++) {

        arrayVisual.setBarVisual(i, 'primary');
        let j = i;
        
        while (j > 0) {

            arrayVisual.setBarVisual(j - 1, 'secondary');
            await pause();
            if (array[j] > array[j - 1]) {
                arrayVisual.setBarVisual(j - 1, 'finished');
                break;
            }

            arrayVisual.setBarVisual(j - 1, 'primary');
            await pause();
            arrayVisual.swapBarHeights(j, j - 1);
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            await pause();
            arrayVisual.setBarVisual(j, 'finished');
            j--;
        } 
        arrayVisual.setBarVisual(j, 'finished');
    }
}







async function mergeSort() {
    async function mergeSortRecursive(low, heigh) {
        async function merge(low, mid, high) {
            let auxiliaryArray = []; auxiliaryArray.length = high - low + 1;; 
        
            let left = low;
            let right = mid + 1;
            let auxiliaryIndex = 0;
            arrayVisual.setBarVisual(left, 'secondary');
            arrayVisual.setBarVisual(right, 'secondary');
        
            while (true) { 
        
                await pause(); 
                if (array[left] <= array[right]) {
                    arrayVisual.setBarVisual(left, 'primary');
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[left]);
                    await pause();
                    auxiliaryArray[auxiliaryIndex] = array[left];
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                    arrayVisual.setBarVisual(left, 'default');
        
                    left++; if (!(left <= mid)) { arrayVisual.setBarVisual(right, 'default'); break; }
                    arrayVisual.setBarVisual(left, 'secondary'); 
                    
                } else {
                    arrayVisual.setBarVisual(right, 'primary');
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[right]);
                    await pause();
                    auxiliaryArray[auxiliaryIndex] = array[right]; 
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                    arrayVisual.setBarVisual(right, 'default');
        
                    right++; if (!(right <= high)) { arrayVisual.setBarVisual(left, 'default'); break; }
                    arrayVisual.setBarVisual(right, 'secondary');
                } 
                auxiliaryIndex++;     
            }
            auxiliaryIndex++;
        
        
            while (left <= mid) { 
                arrayVisual.setBarVisual(left, 'primary');
                arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[left]);
                await pause();
                auxiliaryArray[auxiliaryIndex] = array[left];
                arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                arrayVisual.setBarVisual(left, 'default');
        
                left++; auxiliaryIndex++;
            } 
        
            while (right <= high) { 
                arrayVisual.setBarVisual(right, 'primary');
                arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[right]);
                await pause();
                auxiliaryArray[auxiliaryIndex] = array[right];
                arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                arrayVisual.setBarVisual(right, 'default');
                right++; auxiliaryIndex++;
            }
            
            for (let k = 0; k < high - low + 1; k++) { 
                arrayVisual.setAuxiliaryBarVisual(low + k, 'primary');
                arrayVisual.setBarVisual(low + k, 'primary');
                arrayVisual.setBarHeight(low + k, auxiliaryArray[k]);
                array[low + k] = auxiliaryArray[k];
                await pause();
                
        
                arrayVisual.setBarVisual(low + k, 'default');
                arrayVisual.setAuxiliaryBarVisual(low + k, 'hidden');
            }    
        }


        if (low < heigh) { 
            let mid = Math.floor((low + heigh) / 2);	
            await mergeSortRecursive(low, mid); 
            await mergeSortRecursive(mid + 1, heigh); 
            await merge(low, mid, heigh); 
        }
    }    

    await mergeSortRecursive(0, array.length - 1);
}

export default {setPauseTime, selectionSort, generateArray, bubbleSort, quickSort, heapSort, insertionSort, mergeSort};

