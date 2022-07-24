const { createProxyMiddleware } = require('http-proxy-middleware')
const { makeBasicAuthValue } = require('../tools')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.api.rest_url,
	changeOrigin: true,
	logLevel: 'warn',
	pathRewrite: {
		'^/api/rest/games': '/games',
	},
	onProxyReq: function onProxyReq(proxyReq, req, res) {
		proxyReq.setHeader('Authorization', makeBasicAuthValue(req.session.twitch.login, keys.api.pass))
	},
})
