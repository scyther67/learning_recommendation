let testResources = [];
let test = false; 

chrome.runtime.onMessage.addListener(
    function (req, sender, sendResponse) {
        if (req.visitedResource) {
            if (!test) {
                // console.log(req.intervals);
                chrome.storage.local.get('authorization', function (res) {
                    // console.log(res.authorization);
                    if (res.authorization) {
                        fetch('http://localhost:5000/api/learning/visitedResource',
                            {
                                method: 'POST',
                                headers: {
                                    'authorization': res.authorization,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    url: req.url,
                                    totalTime: req.totalTime,
                                    startTimeStamp: req.resourceStartTimeStamp,
                                    endTimeStamp: req.resourceEndTimeStamp,
                                    intervals: req.intervals
                                })
                            }
                        )
                    }
                });
            }
            // else {
            //     let site = {
            //         "url": req.url,
            //         "totalTime": req.totalTime,
            //         "startTimeStamp": req.resourceStartTimeStamp,
            //         "endTimeStamp": req.resourceEndTimeStamp,
            //         "intervals": req.intervals
            //     }
            //     testResources.push(site);
            //     console.log(testResources);
            // }
            // console.log(Date()+" "+req.data+" "+req.totalTime);
        }
        // else if (req.onTesting)
        //     console.log("Testing");
        // else if (req.startTest) {
        //     console.log("Start Test");
        //     test = true;
        // }
        // else if (req.finishTest) {
        //     console.log("End Test");
        //     chrome.storage.local.get('authorization', function (res) {
        //         console.log(res.authorization);
        //         if (res.authorization) {
        //             fetch('http://localhost:5000/api/test/testLearningDetails',
        //                 {
        //                     method: 'POST',
        //                     headers: {
        //                         'authorization': res.authorization,
        //                         'Content-Type': 'application/json'
        //                     },
        //                     body: JSON.stringify({
        //                         testResources
        //                     })
        //                 }
        //             )
        //         }
        //     });
        //     testResources = [];
        //     test = false;
        // }
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
// chrome.browserAction.onClicked.addListener(function() {
//     console.log("clicked");
//   });