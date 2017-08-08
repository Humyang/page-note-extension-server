// window.addEventListener("click",function(){})

function checkStyle(){
	var nodeBox = document.getElementById("noteBox")
	// console.log(123)
	if(!!!nodeBox){
		var noteBoxStyle = `
#noteMark_wrap_add { position: absolute; top: 0; left: 0; width: 200px; height: 150px; background-color: #eee; z-index: 999999; border: 1px solid #808080; padding: 5px; border-radius: 5px }
.animated { animation-duration: 1s; animation-fill-mode: both; animation-name: pulse; animation-iteration-count: infinite }
@keyframes pulse {
    0% { transform: scaleX(1) }
    50% { transform: scale3d(1.15, 1.15, 1.15) }
    to { transform: scaleX(1) }
}
div#noteMark_wrap_add a { text-decoration: none; color: #fff; border: 1px solid #009e78; border-radius: 5px; margin-right: 10px; width: 50px; display: block; float: left; text-align: center; margin-top: 5px; background-color: #00bfd0; font-size: 16px }
div#noteMark_wrap_add textarea { display: block; border: 0; padding: 0; margin: 0; height: 110px; padding: 5px; width: 188px; border: 1px solid #ddd; border-radius: 5px }
div#noteMark_wrap_add a:hover { background-color: #0095a2 }

.noteMark_List_Item.coll { position: absolute;z-index: 99999; }
.noteMark_List_Item .flag { width: 12px; height: 12px; background-color: #00bfd0; display: block; border-radius: 20px; cursor: pointer }
.noteMark_List_Item p { margin: 0; width: 200px; border: 1px solid #afafaf; background-color: #f7f7f7; font-size: 14px; padding: 6px; border-radius: 4px; margin-top: 5px }
		`
		var style = document.createElement('style');
		style.id = "noteBox"
		style.textContent = noteBoxStyle
		document.body.appendChild(style)
	}
}


function noteMarl_init(){
	// alert(localStorage.getItem('token'))
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
			var x = event.clientX
			var y = event.clientY
			save.onclick=function(e){
				var note = document.querySelectorAll('#noteMark_wrap_add textarea')[0].value
				var Msg = {
						type:'saveNote',
				        "note": note,
				        position:{"x":x,"y":y},
				        url:location.href
				    };
				chrome.runtime.connect().postMessage(Msg);
				element.style.display="none"
				e.preventDefault()
			}
			cancel.id="noteMark_cancel"
			cancel.text="取消"
			cancel.href="#"
			cancel.onclick=function(e){
				element.style.display="none"
				e.preventDefault()
			}
			element.id="noteMark_wrap_add"
			element.append(textarea)
			element.append(save)
			element.append(cancel)
			
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

