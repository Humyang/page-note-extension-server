// alert(@@extension_id)
chrome.tabs.executeScript(null, { file: "content_script.js" });
chrome.tabs.executeScript(null, { file: "checkEnable.js" });

// let loginServer = 'http://localhost:3000/login'
// let regiestServer = 'http://localhost:3000/regiest'
// let loginClient = 'http://localhost:3200/oauth_login'

// function ajax(opt, data) {

//     var xmlObj = new XMLHttpRequest()
//     xmlObj.open('POST', opt.url, true);

//     var formData = new FormData();

//     for (i in data) {
//         formData.append(i, data[i])
//     }
//     xmlObj.send(formData);

//     return new Promise(function(reslove, reject) {
//         xmlObj.addEventListener("load", function(event) {
//             var obj = JSON.parse(event.target.responseText)
//             if (!obj.status) {
//                 var err = JSON.parse(obj.msg)
//                 console.log(err.STATUSCODE + "," + err.MSG)

//                 reject(err.STATUSCODE + "," + err.MSG)
//             }
//             reslove(obj)
//         }, false);
//     })
// }

// function login() {
//     var username = document.getElementById('username')
//     var password = document.getElementById('password')
//     ajax({ url: loginServer }, { username: username.value, password: password.value })
//         .then(function(obj) {
//             // 传递tokenA给后台验证
//             ajax({ url: loginClient }, { 'token': obj.token }).then(function(res) {
//                 // 验证成功，得到tokenB
//                 // alert('登录成功')
//                 // console.log(res)

//                 // 显示设置页面
//                 let msg = {
//                     type: 'LOGIN_SUCCESS'
//                 }
//                 chrome.runtime.connect().postMessage(msg);
//             })

//         }).catch(function(err) {
//             // 异常处理
//             alert(err)
//         })
// }

// function regiest() {
//     var username = document.getElementById('username')
//     var password = document.getElementById('password')
//     ajax({ url: regiestServer }, { username: username.value, password: password.value })
//         .then(function(obj) {
//             console.log(obj)
//         })
//         .catch(function(err) {
//             // 异常处理
//             alert(err)
//         })
// }

// window.onload = function() {
//     var btn_login = document.getElementById('btn_login')
//     var btn_login = document.getElementById('btn_login')

//     btn_login.onclick = function() {
//         login()
//     }
// }