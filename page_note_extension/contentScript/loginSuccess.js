setTimeout(function() {
	// localStorage.setItem('token','5555')
	// alert(localStorage.getItem('token'))
	var msg = {
		type:'loginsuccess',
		username:localStorage.getItem('username'),
		token:localStorage.getItem('token')
	}
	chrome.runtime.sendMessage(msg);
}, 150);
