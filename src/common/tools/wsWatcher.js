import { EventEmitter } from 'events'

export default class extends EventEmitter {
	constructor(login) {
		super()
		
		this.url = `${location.origin.replace(/^http/, 'ws')}/api/ws/games?${login}`
		
		this.init()
	}
	
	init() {
		this.ws = new WebSocket(this.url)
		
		this.ws.onmessage = e => {
			try {
				const data = JSON.parse(e.data)
				this.emit('data', data)
			} catch (e) {
				console.error(e)
			}
		}
		this.ws.onclose = e => {
			if(e.code !== 1000)
				setTimeout(() => this.init(), 5000)
		}
	}
	
	destroy() {
		this.ws.close(1000)
	}
}
