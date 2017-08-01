// window.addEventListener("click",function(){})

function checkStyle(){
	var nodeBox = document.getElementById("noteBox")
	// console.log(123)
	if(!!!nodeBox){
		var noteBoxStyle = `
		#noteMark_wrap_add{    
			position: fixed;
		    top: 0;
		    left: 0;
		    width: 200px;
		    height: 100px;
		    background-color: #eee;
		    z-index: 999999;
		}
		`
		var style = document.createElement('style');
		style.id = "noteBox"
		style.textContent = noteBoxStyle
		document.body.appendChild(style)
	}
}


function noteMarl_init(){
	var ControlDown = false
	window.addEventListener("keydown",function(event){
		if(event.key==="Control"){
			ControlDown = true
		}
	})
	window.addEventListener("keyup",function(event){
		if(event.key==="Control"){
			ControlDown = false
		}
	})
	window.addEventListener("contextmenu",function(event){
		if(!ControlDown){
			return
		}
		var elementNode = document.getElementById("noteMark_wrap_add")
		if(!elementNode){
			var element=document.createElement('div')
			var save=document.createElement('a')
			var cancel=document.createElement('a')
			var textarea=document.createElement('textarea')
			save.id="noteMark_save"
			save.href="#"
			save.text="保存"
			save.onclick=function(e){
				e.preventDefault()
			}
			cancel.id="noteMark_cancel"
			cancel.text="取消"
			cancel.href="#"
			cancel.onclick=function(e){
				// alert(123)
				element.style.display="none"
				e.preventDefault()
			}
			element.id="noteMark_wrap_add"
			element.append(save)
			element.append(cancel)
			element.append(textarea)
			document.body.append(element)
			elementNode = document.getElementById("noteMark_wrap_add")
		}
		elementNode.style=display="block"
		elementNode.style.left = event.clientX + document.body.scrollLeft+ "px";
		elementNode.style.top = event.clientY + document.body.scrollTop -100+ "px";
		event.preventDefault()
	})
}
noteMarl_init()
checkStyle()

