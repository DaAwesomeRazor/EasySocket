const notepack = require('notepack.io');
const WebSocket = require('ws');
class Server {
	constructor() {
		this.listeners = new Map();
		this.conns = new Map();
		this.wss = null;
	}
	
	listen(port) {
		this.wss = new WebSocket.Server({port: port});
		this.createListners();
	}
	
	createListners() {
		this.wss.on('connection', ws => {
			const user = new User(ws);
			this.emit("connection", [user]);
			this.conns.set(this.conns.size, user);
			ws.id = this.conns.size;
			
			ws.on('message', msg => {
				const {id, args} = notepack.decode(msg);
				user.emit(id, args);
			})
		})
	}
	
	on(id, func) {
		this.listeners.set(id, func);
	}
	
	emit(id, args) {
		const listener = this.listeners.get(id);
		if (listener) {
			listener.apply(this, args);
		}
	}
}


class User {
	constructor(ws) {
		this.listeners = new Map();
		this.ws = ws;
	}
	
	on(id, func) {
		this.listeners.set(id, func);
	}
	
	emit(id, args) {
		const listener = this.listeners.get(id);
		if (listener) {
			listener.apply(this, args);
		}
	}
}
module.exports = Server;