chrome.storage.local.get('authorization',function(res){
    if(res.authorization){
        document.getElementById("p_success").hidden = false;
        document.getElementById("form_login").hidden = true;
        document.getElementById("logout").hidden = false;
    }
});
document.getElementById("logout").addEventListener("click", function () {
    document.getElementById("logout").hidden = true;
    chrome.storage.local.remove('authorization');
    document.getElementById("form_login").hidden = false;
    document.getElementById("p_success").hidden = true;
})
document.getElementById("retry").addEventListener("click", function () {
    document.getElementById("p_failure").hidden = true;
    document.getElementById("retry").hidden = true;
    document.getElementById("form_login").hidden = false;
});

document.getElementById("send_login").addEventListener("click", function () {
    // chrome.storage.local.get('authorization', (res) => {
    //     console.log(res.authorization);
    // })
    fetch('http://localhost:5000/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('emailid').value,
                password: document.getElementById('password').value
            })
        })
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        if (data.token) {
            chrome.storage.local.set({ 'authorization': data.token });
            document.getElementById("form_login").hidden = true;
            document.getElementById("p_success").hidden = false;
            document.getElementById("logout").hidden = false;
        }
        else {
            document.getElementById("p_failure").hidden = false;
            document.getElementById("retry").hidden = false;
            document.getElementById("form_login").hidden = true;
        }
    }).catch(err => {
        alert("Error");
        console.log(err);
    })
});
