let resourceStartTimeStamp = new Date();
let segmentStartTimeStamp = resourceStartTimeStamp;
let totalTime = 0;
// console.log("Start time = "+resourceStartTimeStamp);

window.addEventListener("blur", function () {
    totalTime += new Date() - segmentStartTimeStamp;
})

window.addEventListener("focus", function () {
    segmentStartTimeStamp = new Date();
})

window.addEventListener("unload",sendUrlTime);

async function sendUrlTime(event) {   //send data to background.js
    let resourceEndTimeStamp = new Date();
    if (document.hasFocus()) {
        totalTime += resourceEndTimeStamp - segmentStartTimeStamp;
    }
    chrome.runtime.sendMessage({
        function:"visitedResource",
        url: location.href,
        resourceStartTimeStamp,
        resourceEndTimeStamp,
        totalTime
    });
} 

setTimeout(function () {
    sendUrlTime();    //if 1 hour is up then send the data to the background script
    window.removeEventListener("unload", sendUrlTime);// and remove listener so that event does not fire again
}, 3600000);