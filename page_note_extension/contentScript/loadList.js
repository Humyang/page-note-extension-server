// console.log(1)
alert(123)
var dice = 3;
var sides = 6;
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "http://localhost:3200/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
  console.log('data returned:', xhr.response);
}

var query = `
query {
  hello
}

`;
// mutation SetMessage($message:String){
// 		setMessage(message: $message)
// 	}
console.log(1)
xhr.send(JSON.stringify({
  query: query,
  variables: { dice: dice, sides: sides,message:'123456'}
}));