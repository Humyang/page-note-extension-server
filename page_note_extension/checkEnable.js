

var nodeBox = document.getElementById("noteBox")
var Msg = {
        "enable": !!nodeBox
    };
chrome.runtime.connect().postMessage(Msg);