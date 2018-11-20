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
			
			const user = new User(this.conns.size, ws);
			this.conns.set(this.conns.size, user);
			ws.user = user;
			
			this.emit("connection", [user]);
			
			ws.on('message', msg => {
				ws.user.onMessage(msg);
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
	constructor(id, ws) {
		this.listeners = new Map();
		this.ws = ws;
		this.id = id;
	}
	
	onMessage(msg) {
		const {id, args} = notepack.decode(msg);
		this.emitEvent(id, args);
	}
	
	emit(id) {
		var args = []
		for (const arg of arguments) {
			args.push(arg)
		}
		args.shift()
		this.ws.send(notepack.encode({id, args}))
	}
	
	on(id, func) {
		this.listeners.set(id, func);
	}
	
	emitEvent(id, args) {
		const listener = this.listeners.get(id);
		if (listener) {
			listener.apply(this, args);
		}
	}
}
module.exports = Server;