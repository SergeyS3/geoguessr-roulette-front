const fetch = require('node-fetch')
const querystring = require('querystring')
const { client_id, client_secret, redirect_uri } = require('../data/keys').twitch

class Twitch {
	static async getToken(query) {
		if(!query.code && query.error)
			throw Error(`getTwitchToken ${query.error} error: ${query.error_description}`)
		
		const res = await fetch('https://id.twitch.tv/oauth2/token?' + querystring.stringify({
			client_id,
			client_secret,
			code: query.code,
			grant_type: 'authorization_code',
			redirect_uri
		}), {
			method: 'POST'
		})
		
		const data = await res.json()
		
		if(res.status !== 200)
			throw Error(`getTwitchToken error: ${res.status} ${data.message}`)
		
		return data.access_token
	}
	
	static async getUser(query) {
		const token = await this.getToken(query)
		
		const res = await fetch('https://api.twitch.tv/helix/users', {
			headers: {
				Authorization: `Bearer ${token}`,
				'Client-Id': client_id
			},
		})
		
		const data = await res.json()
		
		if(res.status !== 200)
			throw Error(`getTwitchUser error: ${res.status} ${data.message}`)
		
		return data.data[0]
	}
}

module.exports = Twitch
