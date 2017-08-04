// alert(localStorage.getItem('token'))
window.onload = function(){
	// console.log(localStorage.getItem('token'))
	var loginOut = document.getElementById('loginOut')
	
	var logined_name = document.getElementById('logined_name')
	logined_name.textContent = localStorage.getItem('username')

	loginOut.onclick = function(event){
		localStorage.clear()
		event.preventDefault()
	}
}
