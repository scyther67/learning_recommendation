// chrome.runtime.sendMessage({
//     startTest: true
// })

// document.getElementById("fin-btn").addEventListener("click", function () {
//         chrome.runtime.sendMessage({
//             finishTest: true
//         })
// })
console.log(document.getElementById("start-btn"));
document.getElementById("start-btn").addEventListener("click", function () {
    chrome.runtime.sendMessage({
        startTest: true
    })
})
