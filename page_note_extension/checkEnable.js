

var nodeBox = document.getElementById("noteBox")
var Msg = {
		type:'icon',
        "enable": !!nodeBox
    };
chrome.runtime.connect().postMessage(Msg);