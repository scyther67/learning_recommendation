chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.visitedResourceInterval) {
    // console.log("Visited resource called");
    try {
      // console.log("Not in test mode");
      chrome.storage.local.get("authorization", function (res) {
        // console.log(res.authorization);
        // console.log("after res.auth");
        if (res.authorization) {
          // console.log("Sending data for " + req.url);
          console.log(req.unload);
          // console.log(req.segmentStartTimeStamp);
          // console.log(req.segmentEndTimeStamp);
          fetch(
            "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/learning/visitedResource",
            {
              method: "POST",
              headers: {
                authorization: res.authorization,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: req.url,
                startTimeStamp: req.segmentStartTimeStamp,
                endTimeStamp: req.segmentEndTimeStamp,
              }),
            }
          ).catch((err) => {
            console.log(err);
          });
        }
      });
    } catch (err) {
      console.log(err);
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
