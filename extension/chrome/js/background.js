let testResources = [];
let test = false; 

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //   if (request.greeting == "hello")
        //     sendResponse({farewell: "goodbye"});
        if (request.function == "testFinish")
            console.log(request.url);
        else if (request.function == "visitedResource") {
            if (!test) {
                console.log(request.intervals);
                fetch('http://localhost:5000/api/learning/visitedResource',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            url: request.url,
                            totalTime: request.totalTime,
                            startTimeStamp: request.resourceStartTimeStamp,
                            endTimeStamp: request.resourceEndTimeStamp, 
                            intervals: request.intervals
                        })
                    }
                )
            }
            else {
                let site = {
                    "url": request.url,
                    "totalTime": request.totalTime,
                    "startTimeStamp": request.resourceStartTimeStamp,
                    "endTimeStamp": request.resourceEndTimeStamp
                }
                testResources.push(site);
                console.log(testResources);
            }
            // console.log(Date()+" "+request.data+" "+request.totalTime);
        }
        else if(request.function == "finishTest"){
            // fetch('http://localhost:5000/api/test/resourceAcc')
            // setTimeout(function () {
            //     sendUrlTime();    //if 1 hour is up then send the data to the background script
            //     window.removeEventListener("unload", sendUrlTime);// and remove listener so that event does not fire again
            // }, 3600000);
            console.log("Test done");
        }
    });

// chrome.history.onVisited.addListener(function (object) {
//     console.log("Before callback");
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//         let url = tabs[0].url;
//         // use `url` here inside the callback because it's asynchronous!
//         console.log("Entered callback");
//         fetch('http://localhost:3000/api/test/resourceAccess',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ data: url })
//             }
//         );
//         console.log("Exiting callback");
//     });
//     console.log("--------------------");
//     // chrome.tabs.create({ url: "https://www.google.com" });
// })
chrome.browserAction.onClicked.addListener(function() {
    console.log("clicked");
  });