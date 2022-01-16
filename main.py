from time import sleep

class Animation: # make array a param
    def __init__(self, default_color, compare_color, swap_color, finished_color, pause_time ) -> None:
        self.default_color = default_color
        self.compare_color = compare_color
        self.swap_color = swap_color
        self.finished_color = finished_color
        self.pause_time = pause_time

    # change the colors a bars to the default color
    def default(self, *args: tuple[int]) -> None:
        self.pause() # pause 

        for i in args: # loop through each index given as i
            # change the color of the bar at index i to the default color
            pass

    # change the colors of 2 bars to the comparing color 
    def compare(self, i: int, j: int) -> None:
        # change the colors of the bars at index i and j to the comparing color
        
        self.pause() # pause

    # change the colors of 2 bars to the swapping color
    def swap(self, i: int, j: int) -> None:
        # change the colors of the bars at index i and j to the swapping color
        
        self.pause() # pause

    # change the colors a bar to the finished color
    def finished(self, i: int) -> None:
        self.pause() # pause

        # change the color of the bar at index i to the finished color

    # sleeps for pause_time seconds 
    def pause(self) -> None:
        sleep(self.pause_time)
        

animation = Animation()


def selection_sort(array: list[int]) -> None:
    size: int = len(array) # set size of the array to a variable called size

    # sort the array
    for i in range(size): # loop through all indexes of array   
        min_index: int = i # assume that element with i index is minimum

        # Find the minimum element in unsorted array 
        for j in range(i + 1, size): # loop through indexes of unsorted elements
    
            animation.compare(i, j) # changes the colors of the bars at index i and j to the comparing color
            if array[min_index] > array[j]: # check if the element of min_index is larger than value of the index j
                min_index = j # set min_index to j
            animation.default(i, j) # change the color of the bars at index i and j to the default color

        animation.swap(min_index, i) # changes the colors of the bars at index min_index to the swapping color
        array[i], array[min_index] = array[min_index], array[i] # Swap the minimum element with element of index i 
        animation.finished(min_index) # change the color of the bars at index min_index to the finished color
        


if __name__ == "__main__":
    array: list = [-2, 45, 0, 11, -9]
    selection_sort(array)
    print(array)
