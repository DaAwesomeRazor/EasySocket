const EasySocket = require('../server');

const server = new EasySocket();
server.listen(1000);
server.on("connection", function(socket) {
	console.log(socket)
	console.log('User connected');
	
	socket.on("ping", function(num) {
		socket.emit("pong", num * 2);
	})
})

