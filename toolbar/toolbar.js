const pauseTimeSlider = document.getElementById('pause-time-slider');
const arrayLengthSlider = document.getElementById('array-length-slider');
const generateArrayButton = document.getElementById('generate-array-button');
const sortButton = document.getElementById('sort-button');

sortButton.addEventListener('click', async function(event) {
    event.stopImmediatePropagation();
    this.disabled = true;
    await this.onclick();
    this.disabled = false;
});

export default {
    pauseTimeSlider, arrayLengthSlider, generateArrayButton, sortButton,
    get selectedSortingAlgorithm() { return document.querySelector("input[name='sorting-algorithm']:checked").value; }
}

