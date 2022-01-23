// partition for quicksort with pivot being hight instead
async function partition(array, low, high) { // maybe make hight = pivot
    await visualizer.setColor(high, 'rgba(237, 234, 59, 0.8)');
    const pivot = array[high];
    let i = low; 

    
    for (let j = low; j < high; j++) {

        await visualizer.setColor(j, 'rgba(78, 216, 96, 0.8)');
        await visualizer.pause(); // comparing pause

        if (array[j] < pivot) {
            await visualizer.setColor(j, 'rgba(219, 57, 57, 0.8)');
            await visualizer.swap(j, i);
            await visualizer.setColor(i, 'turquoise');
            [array[j], array[i]] = [array[i], array[j]];
            
            i++;
        } else { await visualizer.setColor(j, 'pink'); }
    }
    
    await visualizer.swap(i, high);
    [array[i], array[high]] = [array[high], array[i]] ;
    await visualizer.setColor(i, 'rgba(169, 92, 232, 0.8)'); // set i to the finishedColor
    await visualizer.clearRange(low, i - 1); await visualizer.clearRange(i + 1, high);
    return i;
}
