// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
    // We can only inject scripts to find the title on pages loaded with http
    // and https so for all other pages, we don't ask for the title.
    // alert(123)s
    //   console.log(123)
    // chrome.browserAction.getBadgeBackgroundColor(function(obj){
    // 	console.log(obj)
    // })
    if (tab.url.indexOf("http:") != 0 &&
        tab.url.indexOf("https:") != 0) {
        executeMailto(tab.id, "", tab.url, "");
    } else {
        // chrome.browserAction.setIcon(object details)

        chrome.browserAction.setIcon({
            path: "iconActive.png"
        });

        chrome.tabs.executeScript(null, { file: "page-note.js" });
    }
});


chrome.runtime.onConnect.addListener(function(port) {
  // var tab = port.sender.tab;
  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
  	if(info.enable){
  		// alert(1)
        chrome.browserAction.setIcon({
    	    path: "iconActive.png"
	    });
  	}else{
  		// alert(2)
  		chrome.browserAction.setIcon({
    	    path: "icon.png"
	    });
  	}
  });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.executeScript(null, { file: "checkEnable.js" });
	// chrome.browserAction.setIcon({
	//     path: "iconActive.png"
 //    });
    // how to fetch tab url using activeInfo.tabid
    // chrome.tabs.get(activeInfo.tabId, function(tab) {
    //     if (localStorage['connected'] > 0) {
    //         var domaintmp = tab.url.split("/");
    //         var domain = domaintmp[2];
    //         if (domain.indexOf("www.") == 0) {
    //             domain = domain.replace("www.", "");
    //         }
    //         var isSSL = 0;
    //         auto_black = localStorage['localbldomain'].split("\n");
    //         for (i = 0; i < auto_black.length; i++) {
    //             if (auto_black[i].length < 3) continue;
    //             if (dnsDomainIs(domain, auto_black[i])) {
    //                 isSSL = 1;
    //                 break;
    //             }
    //         }
    //         // if(localStorage['globalssl'] >0)isSSL=1;

    //         if (isSSL > 0) {
    //             chrome.browserAction.setIcon({
    //                 path: "icon-ok-go.png"
    //             });
    //         } else {

    //             chrome.browserAction.setIcon({
    //                 path: "icon-ok.png"
    //             });

    //         }
    //     }

    // })
})