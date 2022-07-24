const rateLimit = require('express-rate-limit')

module.exports = rateLimit({
	windowMs: 30 * 1000,
	max: process.env.NODE_ENV === 'production' ? 40 : 400
})
