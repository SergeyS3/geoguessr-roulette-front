const { Router } = require('express')
const router = Router()
const { client_id, redirect_uri } = require('../data/keys').twitch
const Twitch = require('../tools/twitch')
const debug = require('debug')('auth')

router.get('/', (req, res) => {
	const twitchData = req.session.twitch
	res.json({
		user: twitchData ? {
			login: twitchData.login,
			name: twitchData.display_name,
			pic: twitchData.profile_image_url.replace('profile_image-300x300', 'profile_image-70x70'),
		} : {},
		OAuthData: {
			client_id,
			redirect_uri
		}
	})
})

router.get('/login', async (req, res) => {
	try {
		req.session.twitch = await Twitch.getUser(req.query)
		debug(`${req.session.twitch?.login} logged in`)
		res.redirect('/')
	} catch (e) {
		console.error(e.message)
		res.status(400).end('Auth error')
	}
})

router.get('/logout', async (req, res) => {
	debug(`${req.session.twitch?.login} logged out`)
	req.session.twitch = null
	res.redirect('/')
})

module.exports = router
