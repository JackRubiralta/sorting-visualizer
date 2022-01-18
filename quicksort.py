from animations import *

animation = Animation(0.05)


def partition(array, low, high): 
    i = low - 1

    animation.pivot(high)
    pivot = array[high]
  
    for j in range(low, high): 

        animation.compare(j, high)
        if array[j] <= pivot:           
            i = i + 1 

            animation.swap(i, j)
            array[i], array[j] = array[j], array[i] 

    i = i + 1 

    animation.swap(i, high)
    array[i], array[high] = array[high], array[i] 
    
    return i 

def quicksort(array, low, high):
    if low < high: 
        partition_index = partition(array, low, high) 
  
        quicksort(array, low, partition_index - 1) 
        quicksort(array, partition_index + 1, high) 

if __name__ == "__main__":
    array: list = [2, 4, 0, 3, 9, 7]
    quicksort(array, 0, len(array) - 1)
    print(array)