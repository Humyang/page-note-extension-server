window.onload = function(){
	// let token = localStorage.getItem('token')
	// alert(token)
	// 检测登录状态
	sendToBG({action:'checkLogin'})

	// 发送初始化action
	sendToCS({action:'init'})
	// 发送加载列表action
	// sendToBG({action:'getToken'})
	// chrome.runtime.sendMessage({action:'getToken'});
	// sendMsg({action:'getToken'})
}

function sendToBG(obj){
	chrome.runtime.sendMessage(obj);
}
function sendToCS(obj){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,obj , function(response) {});  
    });
}