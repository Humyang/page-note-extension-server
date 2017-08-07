var nodeBox = document.getElementById("noteBox")
if (!!!nodeBox) {

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

        if (msg.action == 'load_list') {
            console.log(msg.token)
            let token = msg.token
            var dice = 3;
            var sides = 6;
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", "http://localhost:3200/graphql");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onload = function() {
                console.log('data returned:', xhr.response);
            }

            var query = `
    query {
      hello,
      list{
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
                variables: { dice: dice, sides: sides, message: '123456' },
                token: token
            }));
            // alert("Message recieved!");
        }
    });
}