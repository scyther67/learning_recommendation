console.log("On stackoverflow");
let startTime = new Date();
console.log("Start time = "+startTime);
// fetch('http://localhost:3000/api/test/resourceAccess',
//     {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ data: location.href })
//     }
// );

window.addEventListener("unload", async function sendUrlTime(event) {
    let totalTime = new Date() - startTime;
    console.log("Total time = " + totalTime);
    chrome.runtime.sendMessage({data:location.href, totalTime});
    // alert("Exiting");
    fetch('http://localhost:3000/api/test/resourceAccess',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: location.href, totalTime })
        }
    );
});  


// function fn() {
//     let message = {
//         txt: "hello"
//     };
//     chrome.runtime.sendMessage()
// }