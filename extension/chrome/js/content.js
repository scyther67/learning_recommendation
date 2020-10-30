let resourceStartTimeStamp = new Date();
let segmentStartTimeStamp = resourceStartTimeStamp;
let totalTime = 0;
let intervals = [];
let segmentEndTimeStamp;
// console.log("Start time = "+resourceStartTimeStamp);

window.addEventListener("blur", function () {
    segmentEndTimeStamp = new Date();
    totalTime += segmentEndTimeStamp - segmentStartTimeStamp;
    intervals.push({ start: segmentStartTimeStamp, end: segmentEndTimeStamp });
    console.log(intervals);
})

window.addEventListener("focus", function () {
    segmentStartTimeStamp = new Date();
})

window.addEventListener("unload",sendUrlTime);

async function sendUrlTime(event) {   //send data to background.js
    let resourceEndTimeStamp = new Date();
    if (document.hasFocus()) {
        totalTime += resourceEndTimeStamp - segmentStartTimeStamp;
        intervals.push({ start: segmentStartTimeStamp, end: resourceEndTimeStamp });
    }
    chrome.runtime.sendMessage({
        visitedResource:true,
        url: location.href,
        resourceStartTimeStamp,
        resourceEndTimeStamp,
        totalTime,
        intervals
    });
} 

setTimeout(function () {
    sendUrlTime();    //if 1 hour is up then send the data to the background script
    window.removeEventListener("unload", sendUrlTime);// and remove listener so that event does not fire again
}, 3600000);