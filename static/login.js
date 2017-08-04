// function ajax(opt,data){

//             var xmlObj = new XMLHttpRequest()
//             xmlObj.open(opt.method,opt.url,true);


//             var formData = new FormData();

//             for(i in data){
//                 formData.append(i,data[i])
//             }
//             xmlObj.send(formData);

//             return new Promise(function(reslove,reject){
//                 xmlObj.addEventListener("load", function(event){
//                     var obj = JSON.parse(event.target.responseText)
//                     reslove(obj)
//                 }, false);
//             })
//         }
//         function getQueryString(name) { 
//             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
//             var r = window.location.search.substr(1).match(reg); 
//             if (r != null) return decodeURI(r[2]); return null; 
//         } 
//         var eid = getQueryString('eid')
//         function login(){
            
//             // chrome.runtime.connect(eid).postMessage(Msg);
//             var username = document.getElementById('username')
//             var password = document.getElementById('password')
//             ajax({method:'POST',url:'http://localhost:3000/login'},{username:username.value,password:password.value})
//                 .then(function(obj){
//                     // console.log(obj)
//                     // 传递tokenA给后台验证
//                     ajax({method:'POST',url:'http://localhost:3200/oauth_login'},
//                         {'token':obj.token}).then(function(res){
//                             // 验证成功，获取tokenB
//                             localStorage.setItem('token',res.token)

//                             // 跳转到 login_success ，触发 content_script
//                             location.href = '/login_success'
//                         })
                    
//                 })
//         }
//         function regiest(){
//             var username = document.getElementById('username')
//             var password = document.getElementById('password')
//             ajax({method:'POST',url:'http://localhost:3000/regiest'},{username:username.value,password:password.value})
//                 .then(function(obj){
//                     // console.log(obj)
//                 })
//         }















let loginServer = 'http://localhost:3000/login'
let regiestServer = 'http://localhost:3000/regiest'
let loginClient = 'http://localhost:3200/oauth_login'

function ajax(opt, data) {

    var xmlObj = new XMLHttpRequest()
    xmlObj.open('POST', opt.url, true);

    var formData = new FormData();

    for (i in data) {
        formData.append(i, data[i])
    }
    xmlObj.send(formData);

    return new Promise(function(reslove, reject) {
        xmlObj.addEventListener("load", function(event) {
            var obj = JSON.parse(event.target.responseText)
            if (!obj.status) {
                var err = JSON.parse(obj.msg)
                console.log(err.STATUSCODE + "," + err.MSG)

                reject(err.STATUSCODE + "," + err.MSG)
            }
            reslove(obj)
        }, false);
    })
}

function login() {
    var username = document.getElementById('username')
    var password = document.getElementById('password')
    ajax({ url: loginServer }, { username: username.value, password: password.value })
        .then(function(obj) {
            // 传递tokenA给后台验证
            ajax({ url: loginClient }, { 'token': obj.token }).then(function(res) {
                localStorage.setItem('username',res.username)
                localStorage.setItem('token',res.token)
                // 跳转到 login_success ，触发 content_script
                location.href = '/login_success'
                
            })

        }).catch(function(err) {
            // 异常处理
            alert(err)
        })
}

function regiest() {
    var username = document.getElementById('username')
    var password = document.getElementById('password')
    ajax({ url: regiestServer }, { username: username.value, password: password.value })
        .then(function(obj) {
            console.log(obj)
        })
        .catch(function(err) {
            // 异常处理
            alert(err)
        })
}

window.onload = function() {
    var btn_login = document.getElementById('btn_login')
    var btn_login = document.getElementById('btn_login')

    btn_login.onclick = function() {
        login()
    }
}