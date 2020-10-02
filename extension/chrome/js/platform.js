document.getElementById("fin-btn").addEventListener("click", function () {
    
})

async function finishTest(event) {
    
    if (!document.getElementById("fin-btn").innerHTML == "Finish quiz")
        return;
    chrome.runtime.sendMessage({
        finishTest:true
    });
}