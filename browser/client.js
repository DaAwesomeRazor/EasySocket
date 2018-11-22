/*!
 * Notepack.io
 * (c) 2014-2018 Damien Arrachequesne
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.notepack=e():t.notepack=e()}(this,function(){return function(t){function e(i){if(s[i])return s[i].exports;var f=s[i]={exports:{},id:i,loaded:!1};return t[i].call(f.exports,f,f.exports,e),f.loaded=!0,f.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}([function(t,e,s){e.encode=s(1),e.decode=s(2)},function(t,e){"use strict";function s(t,e,s){for(var i=0,f=0,r=s.length;f<r;f++)i=s.charCodeAt(f),i<128?t.setUint8(e++,i):i<2048?(t.setUint8(e++,192|i>>6),t.setUint8(e++,128|63&i)):i<55296||i>=57344?(t.setUint8(e++,224|i>>12),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i)):(f++,i=65536+((1023&i)<<10|1023&s.charCodeAt(f)),t.setUint8(e++,240|i>>18),t.setUint8(e++,128|i>>12&63),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i))}function i(t){for(var e=0,s=0,i=0,f=t.length;i<f;i++)e=t.charCodeAt(i),e<128?s+=1:e<2048?s+=2:e<55296||e>=57344?s+=3:(i++,s+=4);return s}function f(t,e,s){var r=typeof s,n=0,o=0,h=0,u=0,a=0,p=0;if("string"===r){if(a=i(s),a<32)t.push(160|a),p=1;else if(a<256)t.push(217,a),p=2;else if(a<65536)t.push(218,a>>8,a),p=3;else{if(!(a<4294967296))throw new Error("String too long");t.push(219,a>>24,a>>16,a>>8,a),p=5}return e.push({str:s,length:a,offset:t.length}),p+a}if("number"===r)return Math.floor(s)===s&&isFinite(s)?s>=0?s<128?(t.push(s),1):s<256?(t.push(204,s),2):s<65536?(t.push(205,s>>8,s),3):s<4294967296?(t.push(206,s>>24,s>>16,s>>8,s),5):(h=s/Math.pow(2,32)>>0,u=s>>>0,t.push(207,h>>24,h>>16,h>>8,h,u>>24,u>>16,u>>8,u),9):s>=-32?(t.push(s),1):s>=-128?(t.push(208,s),2):s>=-32768?(t.push(209,s>>8,s),3):s>=-2147483648?(t.push(210,s>>24,s>>16,s>>8,s),5):(h=Math.floor(s/Math.pow(2,32)),u=s>>>0,t.push(211,h>>24,h>>16,h>>8,h,u>>24,u>>16,u>>8,u),9):(t.push(203),e.push({float:s,length:8,offset:t.length}),9);if("object"===r){if(null===s)return t.push(192),1;if(Array.isArray(s)){if(a=s.length,a<16)t.push(144|a),p=1;else if(a<65536)t.push(220,a>>8,a),p=3;else{if(!(a<4294967296))throw new Error("Array too large");t.push(221,a>>24,a>>16,a>>8,a),p=5}for(n=0;n<a;n++)p+=f(t,e,s[n]);return p}if(s instanceof Date){var c=s.getTime();return h=Math.floor(c/Math.pow(2,32)),u=c>>>0,t.push(215,0,h>>24,h>>16,h>>8,h,u>>24,u>>16,u>>8,u),10}if(s instanceof ArrayBuffer){if(a=s.byteLength,a<256)t.push(196,a),p=2;else if(a<65536)t.push(197,a>>8,a),p=3;else{if(!(a<4294967296))throw new Error("Buffer too large");t.push(198,a>>24,a>>16,a>>8,a),p=5}return e.push({bin:s,length:a,offset:t.length}),p+a}if("function"==typeof s.toJSON)return f(t,e,s.toJSON());var g=[],w="",v=Object.keys(s);for(n=0,o=v.length;n<o;n++)w=v[n],"function"!=typeof s[w]&&g.push(w);if(a=g.length,a<16)t.push(128|a),p=1;else if(a<65536)t.push(222,a>>8,a),p=3;else{if(!(a<4294967296))throw new Error("Object too large");t.push(223,a>>24,a>>16,a>>8,a),p=5}for(n=0;n<a;n++)w=g[n],p+=f(t,e,w),p+=f(t,e,s[w]);return p}if("boolean"===r)return t.push(s?195:194),1;if("undefined"===r)return t.push(212,0,0),3;throw new Error("Could not encode")}function r(t){var e=[],i=[],r=f(e,i,t),n=new ArrayBuffer(r),o=new DataView(n),h=0,u=0,a=-1;i.length>0&&(a=i[0].offset);for(var p,c=0,g=0,w=0,v=e.length;w<v;w++)if(o.setUint8(u+w,e[w]),w+1===a){if(p=i[h],c=p.length,g=u+a,p.bin)for(var l=new Uint8Array(p.bin),U=0;U<c;U++)o.setUint8(g+U,l[U]);else p.str?s(o,g,p.str):void 0!==p.float&&o.setFloat64(g,p.float);h++,u+=c,i[h]&&(a=i[h].offset)}return n}t.exports=r},function(t,e){"use strict";function s(t){if(this.offset=0,t instanceof ArrayBuffer)this.buffer=t,this.view=new DataView(this.buffer);else{if(!ArrayBuffer.isView(t))throw new Error("Invalid argument");this.buffer=t.buffer,this.view=new DataView(this.buffer,t.byteOffset,t.byteLength)}}function i(t,e,s){for(var i="",f=0,r=e,n=e+s;r<n;r++){var o=t.getUint8(r);if(0!==(128&o))if(192!==(224&o))if(224!==(240&o)){if(240!==(248&o))throw new Error("Invalid byte "+o.toString(16));f=(7&o)<<18|(63&t.getUint8(++r))<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0,f>=65536?(f-=65536,i+=String.fromCharCode((f>>>10)+55296,(1023&f)+56320)):i+=String.fromCharCode(f)}else i+=String.fromCharCode((15&o)<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0);else i+=String.fromCharCode((31&o)<<6|63&t.getUint8(++r));else i+=String.fromCharCode(o)}return i}function f(t){var e=new s(t),i=e.parse();if(e.offset!==t.byteLength)throw new Error(t.byteLength-e.offset+" trailing bytes");return i}s.prototype.array=function(t){for(var e=new Array(t),s=0;s<t;s++)e[s]=this.parse();return e},s.prototype.map=function(t){for(var e="",s={},i=0;i<t;i++)e=this.parse(),s[e]=this.parse();return s},s.prototype.str=function(t){var e=i(this.view,this.offset,t);return this.offset+=t,e},s.prototype.bin=function(t){var e=this.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e},s.prototype.parse=function(){var t,e=this.view.getUint8(this.offset++),s=0,i=0,f=0,r=0;if(e<192)return e<128?e:e<144?this.map(15&e):e<160?this.array(15&e):this.str(31&e);if(e>223)return(255-e+1)*-1;switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return s=this.view.getUint8(this.offset),this.offset+=1,this.bin(s);case 197:return s=this.view.getUint16(this.offset),this.offset+=2,this.bin(s);case 198:return s=this.view.getUint32(this.offset),this.offset+=4,this.bin(s);case 199:return s=this.view.getUint8(this.offset),i=this.view.getInt8(this.offset+1),this.offset+=2,[i,this.bin(s)];case 200:return s=this.view.getUint16(this.offset),i=this.view.getInt8(this.offset+2),this.offset+=3,[i,this.bin(s)];case 201:return s=this.view.getUint32(this.offset),i=this.view.getInt8(this.offset+4),this.offset+=5,[i,this.bin(s)];case 202:return t=this.view.getFloat32(this.offset),this.offset+=4,t;case 203:return t=this.view.getFloat64(this.offset),this.offset+=8,t;case 204:return t=this.view.getUint8(this.offset),this.offset+=1,t;case 205:return t=this.view.getUint16(this.offset),this.offset+=2,t;case 206:return t=this.view.getUint32(this.offset),this.offset+=4,t;case 207:return f=this.view.getUint32(this.offset)*Math.pow(2,32),r=this.view.getUint32(this.offset+4),this.offset+=8,f+r;case 208:return t=this.view.getInt8(this.offset),this.offset+=1,t;case 209:return t=this.view.getInt16(this.offset),this.offset+=2,t;case 210:return t=this.view.getInt32(this.offset),this.offset+=4,t;case 211:return f=this.view.getInt32(this.offset)*Math.pow(2,32),r=this.view.getUint32(this.offset+4),this.offset+=8,f+r;case 212:return i=this.view.getInt8(this.offset),this.offset+=1,0===i?void(this.offset+=1):[i,this.bin(1)];case 213:return i=this.view.getInt8(this.offset),this.offset+=1,[i,this.bin(2)];case 214:return i=this.view.getInt8(this.offset),this.offset+=1,[i,this.bin(4)];case 215:return i=this.view.getInt8(this.offset),this.offset+=1,0===i?(f=this.view.getInt32(this.offset)*Math.pow(2,32),r=this.view.getUint32(this.offset+4),this.offset+=8,new Date(f+r)):[i,this.bin(8)];case 216:return i=this.view.getInt8(this.offset),this.offset+=1,[i,this.bin(16)];case 217:return s=this.view.getUint8(this.offset),this.offset+=1,this.str(s);case 218:return s=this.view.getUint16(this.offset),this.offset+=2,this.str(s);case 219:return s=this.view.getUint32(this.offset),this.offset+=4,this.str(s);case 220:return s=this.view.getUint16(this.offset),this.offset+=2,this.array(s);case 221:return s=this.view.getUint32(this.offset),this.offset+=4,this.array(s);case 222:return s=this.view.getUint16(this.offset),this.offset+=2,this.map(s);case 223:return s=this.view.getUint32(this.offset),this.offset+=4,this.map(s)}throw new Error("Could not parse")},t.exports=f}])});
//# sourceMappingURL=notepack.js.map

class EasySocket {
	constructor(ip) {
		this.listeners = new Map();
		this.ws = null;
		this.ip = ip;
		
		this.connect();
	}
	
	connect() {
		this.ws = new WebSocket(this.ip);
		this.ws.binaryType = "arraybuffer";
	
		this.ws.onmessage = this.onMessage.bind(this);
		this.ws.onclose = this.onClose.bind(this);
		this.ws.onerror = this.onError.bind(this);
		this.ws.onopen = this.onOpen.bind(this);

	}
	
	onOpen() {
		this.emitEvent("connect");
	}
	
	onMessage({data}) {
		const {id, args} = notepack.decode(data);
		this.emitEvent(id, args);
	}
	
	onClose(arg) {
		this.emitEvent("close", arg);
	}
	
	onError(arg) {
		this.emitEvent("error", arg);
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
	
	close() {
		this.ws.close();
	}
}

window.EasySocket = EasySocket;