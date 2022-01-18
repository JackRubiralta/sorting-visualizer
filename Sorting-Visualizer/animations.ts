class BarAnimation {
    constructor() -> None {
        this.default_color: str = 'blue';
        this.compare_color: str = 'green';
        this.finished_color: str = 'purple';
        this.swap_color: str = 'red';
        this.pivot_color: str = 'yellow';
        this.pause_time: float = 1 
    }

    array_bars() -> list {
        return document.getElementsByClassName('array-bar') 
    }

    funtion render_array(array: list[int]): None {
        pass
    }

    // change the colors of 2 bars to the comparing color then pause and revert to the original color
    compare(index1: int, index2: int) -> None:
        // save the previous colors
        index1_color: str = this.array_bars[index1].backgroundColor
        index2_color: str = this.array_bars[index1].backgroundColor  

        // change the colors to the comparing color
        this.array_bars[index1].backgroundColor = this.compare_color
        this.array_bars[index2].backgroundColor = this.compare_color 
        
        this.pause()

        // change the colors back to their original colors
        this.array_bars[index1].backgroundColor = index1_color
        this.array_bars[index2].backgroundColor = index2_color 

    // change the colors of 2 bars to the swapping color and swap
    funtion swap(index1: int, index2: int) -> None:
        // save the previous colors
        index1_color: str = this.array_bars[index1].backgroundColor
        index2_color: str = this.array_bars[index1].backgroundColor  

        // change the colors to the comparing color
        this.array_bars[index1].backgroundColor = this.swap_color
        this.array_bars[index2].backgroundColor = this.swap_color 
        
        this.pause()
        
        // swap the heights of the bars
        this.array_bars[index1].height, this.array_bars[index2].height = this.array_bars[index2].height, this.array_bars[index1].height
        
        this.pause()

        // change the colors back to their original colors
        this.array_bars[index1].backgroundColor = index1_color
        this.array_bars[index2].backgroundColor = index2_color     

    // change the colors a bar to the finished color
    funtion finished(this, index: int) -> None:
        // change the color of the bar of index to the finished color
        this.array_bars[index].backgroundColor = this.finished_color

    // change the colors a bar to the pivot color
    funtion finished(this, index: int) -> None:
        // change the color of the bar of index to the pivot color
        this.array_bars[index].backgroundColor = this.pivot_color

    // sleeps for pause_time seconds 
    funtion pause(this) -> None:
        sleep(this.pause_time)
}
   