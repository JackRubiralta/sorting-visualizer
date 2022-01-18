class Visualizer {
    defaultColor: string = 'blue';
    compareColor: string = 'green';
    finishedColor: string = 'purple';
    swapColor: string = 'red';
    pivotColor: string = 'yellow';
    pauseTime: number = 1;

    constructor() {
        this.defaultColor = 'blue';
        this.compareColor = 'green';
        this.finishedColor = 'purple';
        this.swapColor = 'red';
        this.pivotColor = 'yellow';
        this.pauseTime = 1;
    }

    get arrayBars(): HTMLCollectionOf<HTMLElement> {
        return document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>
    }

    render(array: number[]): void {
        let arrayContainer = document.getElementById('array');
        let buffer: string = ""
        for (var i = 0; i < array.length; i++) {
            buffer += `<div class="array-bar" key=${i} style="background-color: ${this.defaultColor}; height: ${array[i]};"></div>`
        }
        arrayContainer.innerHTML = buffer;
    }

    // change the colors of 2 bars to the comparing color then pause and revert to the original color
    compare(index1: number, index2: number): void {
        let bar1Style: CSSStyleDeclaration = this.arrayBars[index1].style;
        let bar2Style: CSSStyleDeclaration = this.arrayBars[index2].style;

        // save the previous colors
        let bar1Color: string = bar1Style.backgroundColor;
        let bar2Color: string = bar2Style.backgroundColor;  

        // change the colors to the comparing color
        bar1Style.backgroundColor = this.compareColor;
        bar2Style.backgroundColor = this.compareColor ;
        
        this.pause();

        // change the colors back to their original colors
        bar1Style.backgroundColor = bar1Color;
        bar2Style.backgroundColor = bar2Color;
    }

    // change the colors of 2 bars to the swapping color and swap
    swap(index1: number, index2: number): void {
        let bar1Style: CSSStyleDeclaration = this.arrayBars[index1].style;
        let bar2Style: CSSStyleDeclaration = this.arrayBars[index2].style;

        // save the previous colors
        let bar1Color: string = bar1Style.backgroundColor;
        let bar2Color: string = bar2Style.backgroundColor;  

        // change the colors to the comparing color
        bar1Style.backgroundColor = this.swapColor;
        bar2Style.backgroundColor = this.swapColor;
        
        this.pause();
        // swap the heights of the bars
        bar1Style.height, bar1Style.height = bar1Style.height, bar1Style.height;
        this.pause();

        // change the colors back to their original colors
        bar1Style.backgroundColor = bar1Color;
        bar2Style.backgroundColor = bar2Color;
    }

    // change the colors a bar to the finished color
    finished(index: number): void {
        // change the color of the bar of index to the finished color
        this.arrayBars[index].style.backgroundColor = this.finishedColor;
    }

    // change the colors a bar to the pivot color
    pivot(this, index: number): void {
        // change the color of the bar of index to the pivot color
        this.arrayBars[index].style.backgroundColor = this.pivotColor;
    }

    // sleeps for pause_time seconds 
    pause(this): void {
        sleep(this.pause_time)
    }
}

   
