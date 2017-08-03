
const LOGIN_URL = 'http://localhost:3200'
function isLogined(){
    let token = localStorage.getItem('token')
    if(!!!token){
        return false
    }
    return true
    // 检验登录状态
}
// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
    

    // 判断是否登录
    if(isLogined()){
        // 已登录
        // 加载笔记，加载content script
        chrome.tabs.executeScript(null, { file: "content_script.js" });
        chrome.tabs.executeScript(null, { file: "checkEnable.js" });

        //页面右上角显示弹窗
    }else{
        // 未登录，弹窗登录页面
        chrome.tabs.create({url: LOGIN_URL+'/login.html'})
    }
});

function ajax(opt,data){
    var xmlObj = new XMLHttpRequest()
    xmlObj.open(opt.method,opt.url,true);


    var formData = new FormData();

    for(i in data){
        formData.append(i,data[i])
    }
    xmlObj.send(formData);

    return new Promise(function(reslove,reject){
        xmlObj.addEventListener("load", function(event){
            var obj = JSON.parse(event.target.responseText)
            reslove(obj)
        }, false);
    })
}
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if(msg.type === 'icon'){
        if(msg.enable){
        chrome.browserAction.setIcon({
            path: "iconActive.png"
        });
        }else{
            chrome.browserAction.setIcon({
                path: "icon.png"
            });
        }
    }
    if(msg.type === 'saveMsg'){
        var token = localStorage.getItem('token')
        // 保存数据
        
        ajax({method:'POST',url:'http://localhost:3200/note'},
                {
                    token:token,
                    note:'123123',
                    position:JSON.stringify({x:1,y:2})
                }
            )
        .then(function(obj){
            alert(obj)
            console.log(obj)
            
        })
    }
  });
});

chrome.runtime.onMessage.addListener(function(token) {
    // alert(token)
    localStorage.setItem('token',token)

    //TODO: 找到原跳转页面，执行 content_script
    
    chrome.tabs.executeScript(null, { file: "content_script.js" });
    chrome.tabs.executeScript(null, { file: "checkEnable.js" });
    // alert(localStorage.getItem('token'))
    // chrome.tabs.executeScript(null, { code:`localStorage.setItem('token','4444')` });
    
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.executeScript(null, { file: "checkEnable.js" });
})