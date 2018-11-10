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
			this.emit("connection", ws);
			this.conns.set(this.conns.size, ws);
			ws.id = this.conns.size;
			
			ws.on('message', msg => {
				const {id, args} = notepack.decode(msg);
				this.emit(id, args);
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
module.exports = Server;