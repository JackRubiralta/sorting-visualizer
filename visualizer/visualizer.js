import arrayVisual from './arrayVisual/arrayVisual.js';

/**
 * @type {number[]}
 */
var array;
var pauseTime;
const sortingAlgorithms = {
    *selectionSort() {
        let minIndex;
    
        for (let i = 0; i < array.length; i++) { 
            
            arrayVisual.setBarVisual(i, 'primary'); 
            minIndex = i;
            
            for (let j = i + 1; j < array.length; j++) { 
                
                arrayVisual.setBarVisual(j, 'secondary'); 
                yield; // comparing pause  
                if (array[minIndex] > array[j]) {
                    
                    arrayVisual.setBarVisual(minIndex, 'default'); 
                    arrayVisual.setBarVisual(j, 'primary'); 
                    minIndex = j;
    
                } else { arrayVisual.setBarVisual(j, 'default'); } 
            }
    
            arrayVisual.setBarVisual(i, 'primary');
            yield; // swapping pause
            arrayVisual.swapBarHeights(minIndex, i); 
            [array[minIndex], array[i]] = [array[i], array[minIndex]];  
            yield; // swapping pause
            arrayVisual.setBarVisual(minIndex, 'default'); 
            arrayVisual.setBarVisual(i, 'finished'); 
        }
    },
    
    *bubbleSort() {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < (array.length - i - 1); j++) {
    
                // Comparing j and j + 1
                arrayVisual.setBarVisual(j, 'secondary');
                arrayVisual.setBarVisual(j + 1, 'secondary');
                yield; // comparing pause  
                if (array[j] > array[j + 1]) {
    
                    // Swapping j and j + 1
                    arrayVisual.setBarVisual(j, 'primary'); arrayVisual.setBarVisual(j + 1, 'primary');
                    yield;
                    arrayVisual.swapBarHeights(j, j + 1);
                    yield;
                    [array[j + 1], array[j]] = [array[j], array[j + 1]]; 
                }
                arrayVisual.setBarVisual(j, 'default'); 
            }
            arrayVisual.setBarVisual(array.length - i - 1, 'finished');
        }
    },
    
    * quickSort() {
        function* quickSortRecursive(low, high) {
            function* partition(low, high) {
                arrayVisual.setBarVisual(low, 'pivot'); 
                let pivot = array[low];
    
                let i = low;    
                for (let j = low + 1; j <= high; ++j) { 
                    
                    // Comparing j and pivot
                    arrayVisual.setBarVisual(j, 'secondary');
                    yield;
                    if (array[j] < pivot)  { 
                        i++;
        
                        // Swapping j and i
                        arrayVisual.setBarVisual(j, 'primary');
                        yield;
                        arrayVisual.swapBarHeights(j, i); arrayVisual.swapBarVisuals(j, i);
                        [array[j], array[i]] = [array[i], array[j]]; 
                        yield;
        
                        arrayVisual.setBarVisual(i, 'smaller'); 
        
                    } else { arrayVisual.setBarVisual(j, 'larger'); }
                }
                
                // Swapping pivot and i
                yield;
                arrayVisual.swapBarHeights(low, i); arrayVisual.swapBarVisuals(low, i);
                [array[low], array[i]] = [array[i], array[low]];
                yield;
        
                arrayVisual.setBarVisual(i, 'finished');
                arrayVisual.setBarRangeVisual(low, i - 1, 'default');
                arrayVisual.setBarRangeVisual(i + 1, high, 'default');
                return i; 
            }
    
            if (low < high) {
                let pivotIndex = yield *partition(low, high);
                yield;
                //await Promise.all([quickSortRecursive(low, pivotIndex - 1), quickSortRecursive(pivotIndex + 1, high)]);
                yield *quickSortRecursive(low, pivotIndex - 1);
                yield *quickSortRecursive(pivotIndex + 1, high);
            } else { 
               //arrayVisual.setBarVisual(low, 'finished');
            }
           
        }
    
        yield *quickSortRecursive(0, array.length - 1);
    },
    
    *heapSort() {
        function* heapify(n, i) {
            arrayVisual.setBarVisual(i, 'primary');
            let largest = i; 
            let low = 2 * i + 1;
            let high = 2 * i + 2;
        
            if (low < n) {
                arrayVisual.setBarVisual(low, 'secondary');
                yield;
                if (array[low] > array[largest]) {
        
                    arrayVisual.setBarVisual(largest, 'default');
                    arrayVisual.setBarVisual(low, 'primary');
                    largest = low;
                } else { arrayVisual.setBarVisual(low, 'default'); }
            }
        
            if (high < n) {
                arrayVisual.setBarVisual(high, 'secondary');
                yield;
                if (array[high] > array[largest]) {
        
                    arrayVisual.setBarVisual(largest, 'default');
                    arrayVisual.setBarVisual(high, 'primary');
                    largest = high;
                } else { arrayVisual.setBarVisual(high, 'default'); }
            }
        
            if (largest != i) {
                arrayVisual.setBarVisual(i, 'primary');
                yield;
                arrayVisual.swapBarHeights(i, largest);
                [array[i], array[largest]] = [array[largest], array[i]];
                yield;
        
                arrayVisual.setBarVisual(largest, 'default');
                arrayVisual.setBarVisual(i, 'default');
                yield *heapify(n, largest);
            } else { arrayVisual.setBarVisual(largest, 'default'); arrayVisual.setBarVisual(i, 'default'); }
            
        }
    
    
        for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
            yield *heapify(array.length, i);
        }
    
        for (let i = array.length - 1; i > 0; i--) {
            arrayVisual.setBarVisual(i, 'primary');
            arrayVisual.setBarVisual(0, 'primary')
            
            yield;
            arrayVisual.swapBarHeights(0, i);
            [array[i], array[0]] = [array[0], array[i]];
            yield;
    
            arrayVisual.setBarVisual(0, 'default');
            arrayVisual.setBarVisual(i, 'finished');
            yield *heapify(i, 0);
        }
        arrayVisual.setBarVisual(0, 'finished');
    },
    
    *insertionSort() { 
        for (let i = 1; i < array.length; i++) {
    
            arrayVisual.setBarVisual(i, 'primary');
            let j = i;
            
            while (j > 0) {
    
                arrayVisual.setBarVisual(j - 1, 'secondary');
                yield;
                if (array[j] > array[j - 1]) {
                    arrayVisual.setBarVisual(j - 1, 'finished');
                    break;
                }
    
                arrayVisual.setBarVisual(j - 1, 'primary');
                yield;
                arrayVisual.swapBarHeights(j, j - 1);
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
                yield;
                arrayVisual.setBarVisual(j, 'finished');
                j--;
            } 
            arrayVisual.setBarVisual(j, 'finished');
        }
    },
    
    *mergeSort() {
        function* mergeSortRecursive(low, heigh) {
            function* merge(low, mid, high) {
                let auxiliaryArray = []; auxiliaryArray.length = high - low + 1;; 
            
                let left = low;
                let right = mid + 1;
                let auxiliaryIndex = 0;
                arrayVisual.setBarVisual(left, 'secondary');
                arrayVisual.setBarVisual(right, 'secondary');
            
                while (true) { 
                    
                    
                    yield; 
                    if (array[left] <= array[right]) {
                        arrayVisual.setBarVisual(left, 'primary');
                        arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[left]);
                        
                        yield;
                        auxiliaryArray[auxiliaryIndex] = array[left];
                        arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                        arrayVisual.setBarVisual(left, 'default');
            
                        left++; if (!(left <= mid)) { arrayVisual.setBarVisual(right, 'default'); break; }
                        arrayVisual.setBarVisual(left, 'secondary'); 
                        
                    } else {
                        arrayVisual.setBarVisual(right, 'primary');
                        arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[right]);
                        yield;
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
                    yield;
                    auxiliaryArray[auxiliaryIndex] = array[left];
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'auxiliary');
                    arrayVisual.setBarVisual(left, 'default');
            
                    left++; auxiliaryIndex++;
                } 
            
                while (right <= high) { 
                    arrayVisual.setBarVisual(right, 'primary');
                    arrayVisual.setAuxiliaryBarVisual(low + auxiliaryIndex, 'primary'); arrayVisual.setAuxiliaryBarHeight(low + auxiliaryIndex, array[right]);
                    yield;
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
                    yield;
                    
            
                    if (auxiliaryArray.length != array.length) {
                        arrayVisual.setBarVisual(low + k, 'default');
                    } else {
                        arrayVisual.setBarVisual(low + k, 'finished');
                    }
                    arrayVisual.setAuxiliaryBarVisual(low + k, 'hidden');
                }    
            }
    
    
            if (low < heigh) { 
                let mid = Math.floor((low + heigh) / 2);	
                yield *mergeSortRecursive(low, mid); 
                yield *mergeSortRecursive(mid + 1, heigh); 
                yield *merge(low, mid, heigh); 
            }
        }    
    
        yield *mergeSortRecursive(0, array.length - 1);
    },
};

async function visualizeAlgorithm(algorithmName) {
    arrayVisual.setBarRangeVisual(0, array.length - 1, 'default');
    let currentAlgorithm = sortingAlgorithms[algorithmName]();

    visualizeAlgorithm.running = true;
    while (visualizeAlgorithm.running) {
        if (currentAlgorithm.next().done) { break; }
        await new Promise(r => { setTimeout(r, pauseTime); });
    } 
    visualizeAlgorithm.running = false;

};

/**
 * Generates new array and stop current visualization 
 */
function generateArray(length) {
    let min = 20; let max = 100;

    // stopping visualization  
    visualizeAlgorithm.running = false;
    
    // generate random array
    array = Array.from({length: length}, () => Math.floor(Math.random() * (max - min) ) + min);
    
    // rendering new array
    arrayVisual.render(array);
};


export default { generateArray, visualizeAlgorithm, set pauseTime(ms) { pauseTime = ms; }};
