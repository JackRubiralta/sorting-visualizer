from animations import *

animation = Animation()


def selection_sort(array: list[int]) -> None:
    size: int = len(array) # set size of the array to a variable called size

    # loop through the array and sort each value array
    for i in range(size): # loop through all indexes of array   
        min_index: int = i # assume that element with i index is minimum

        # Find the minimum element in unsorted array 
        for j in range(i + 1, size): # loop through indexes of unsorted elements
    
            animation.compare(i, j) # run the comparing animation
            if array[min_index] > array[j]: # check if the element of min_index is larger than value of the index j
                min_index = j # set min_index to j

        animation.swap(min_index, i) # run the swapping animation
        array[i], array[min_index] = array[min_index], array[i] # Swap the minimum element with element of index i 
        
        animation.finished(min_index) # change the color of the bars at index min_index to the finished color


if __name__ == "__main__":
    array: list = [2, 4, 0, 3, 9, 7]
    selection_sort(array)
    print(array)