// file for usefull methods
// also for methods that edit html or get it

// might add button adding method
// might add timer method

export async function sleep(ms) {
    return new Promise(res => { setTimeout(() => res(), ms); });
}

export function arrayBar(index) {
    return document.getElementsByClassName('array-bar')[index].style;
}
