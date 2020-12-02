let segmentStartTimeStamp = new Date();

window.addEventListener("blur", sendInterval);
window.addEventListener("focus", function (event) {
    segmentStartTimeStamp = new Date();
});

window.addEventListener("unload", function(event){
    console.log("in fn");
    if(document.hasFocus()){
        segmentEndTimeStamp = new Date();
        chrome.runtime.sendMessage({
            unload:true,
            visitedResourceInterval:true,
            url: location.href,
            segmentStartTimeStamp,
            segmentEndTimeStamp,
        });
    }
});

function sendInterval(event){   
    console.log("in sendInterval");
    segmentEndTimeStamp = new Date();
    chrome.runtime.sendMessage({
        visitedResourceInterval:true,
        url: location.href,
        segmentStartTimeStamp,
        segmentEndTimeStamp,
    });
}