// chrome.storage.local.get('authorization',function(token){
//     if(token){
//         document.getElementById("p_success").hidden = false;
//         document.getElementById("form_submit").hidden = true;
//     }
// });
// document.getElementById("submit").addEventListener("click", function() {
//     fetch('http://localhost:5000/api/auth/login',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email:document.getElementById('email').innerHTML;
//                     password:document.getElementById('password').innerHTML;
//                 })
//             }
//         )
// }, function(res){
//     console.log(res);
// });
