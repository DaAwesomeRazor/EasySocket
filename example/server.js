const EasySocket = require('../server');

const server = new EasySocket();
server.listen(1000);
server.on("connection", function() {
	console.log('User connected')
})

server.on("test", function(a, b) {
	console.log(a, b)
})