var nodeBox = document.getElementById("noteBox")
if (!!!nodeBox) {

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.action == 'load_list') {
        console.log(msg.token)
        let token = msg.token

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", "http://localhost:3200/graphql");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = function() {
            console.log('data returned:', xhr.response);
            buildNoteList(xhr.response.data.list)
        }

    var query = `
        query GETLIST($url:String){
          list(url:$url){
            note_id,
            note,
            position{
                x,
                y
            }
          }
        }
    `;

        console.log(1)
        xhr.send(JSON.stringify({
            query: query,
            variables: { url:location.href },
            token: token
        }));
        // alert("Message recieved!");
    }
    });
}
function buildNoteList(list){
    // noteMark_List_Item 

    for (var i = list.length - 1; i >= 0; i--) {
        // list[i]

        var wrap=document.createElement('div')
        var span = document.createElement('span')
        var p1 = document.createElement('p')

        span.className = "flag animated"
        wrap.className = 'noteMark_List_Item coll '

        p1.textContent = list[i].note

        wrap.style.left = list[i].position.x+"px"
        wrap.style.top = list[i].position.y+"px"

        wrap.append(span)
        wrap.append(p1)

        document.body.append(wrap)
    }
} 