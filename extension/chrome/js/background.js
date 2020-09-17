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
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //   if (request.greeting == "hello")
        //     sendResponse({farewell: "goodbye"});
        fetch('http://localhost:5000/api/test/resourceAccess',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: request.url,
                    totalTime: request.totalTime,
                    startTimeStamp: request.resourceStartTimeStamp,
                    endTimeStamp: request.resourceEndTimeStamp
                })
            }
        )
        console.log(Date()+" "+request.data+" "+request.totalTime);
    });