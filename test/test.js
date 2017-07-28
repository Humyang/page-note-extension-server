var http = require('http')
function fetch(data,config){
	return new Promise(function(reslove,reject){
		const body = JSON.stringify(data);
		// let _config = ctx._config
		const options = 
		  Object.assign(config,
		  {method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    "Content-Length": Buffer.byteLength(body)
		  }})

		const req = http.request(options, (res) => {
		  let data = ''
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		  	data = chunk
		  });
		  res.on('end', () => {
		  	reslove(JSON.parse(data))
		  });
		});
		req.on('error', (e) => {
			reject(e.message)
		});
		req.end(body);
	})
}
let config = {
	hostname: 'localhost',
  	port: 3200
}
fetch({},Object.assign(config,{path:'/note'})).then(function(result){
	console.log(result)
})