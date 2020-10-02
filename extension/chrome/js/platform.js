// document.getElementById("fin-btn").addEventListener("click", function () {
    
// })

// async function finishTest(event) {
    
//     if (!document.getElementById("fin-btn").innerHTML == "Finish quiz")
//         return;
//     chrome.runtime.sendMessage({
//         finishTest:true
//     });
// }
chrome.runtime.sendMessage({
    onTesting: true
});
console.log(document.getElementById("start-btn"));
// if (document.getElementById("start-btn")) {
document.getElementById("start-btn").addEventListener("click", function () {
    chrome.runtime.sendMessage({
        startTest: true
    })
})
// }
// if (document.getElementById("fin-btn")) {
                                    // document.getElementById("fin-btn").addEventListener("click", function () {
                                    //     chrome.runtime.sendMessage({
                                    //         finishTest: true
                                    //     })
                                    // })
// }