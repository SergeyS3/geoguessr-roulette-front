import { _fetch } from './tools'

export default class {
	constructor(login) {
		this.login = login
	}
	
	async getList() {
		const res = await this.fetch()
		
		if(res.status !== 200)
			throw Error('fetch error')
		
		return await res.json()
	}
	
	async update(data) {
		const res = await this.fetch('PUT', data)
		
		if(res.status !== 200)
			throw Error('fetch error')
	}
	
	fetch(method = 'GET', data = null) {
		return _fetch(`/api/rest/games/${this.login}`, method, data)
	}
}
