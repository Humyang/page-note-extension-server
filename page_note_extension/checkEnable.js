
// console.log(123)
// alert(123)
var nodeBox = document.getElementById("noteBox")

var Msg = {
		type:'icon',
        "enable": !!nodeBox
    };
chrome.runtime.connect().postMessage(Msg);