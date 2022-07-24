const { createProxyMiddleware } = require('http-proxy-middleware')
const keys = require('../data/keys')

module.exports = createProxyMiddleware({
	target: keys.api.ws_url,
	changeOrigin: true,
	logLevel: 'warn',
	ws: true,
	pathRewrite: {
		'^/api/ws/games': '/games',
	},
})
