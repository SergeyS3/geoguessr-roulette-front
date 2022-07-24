const express = require('express')
const path = require('path')
const compression = require('compression')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const keys = require('./data/keys')

const apiRateLimiter = require('./middleware/apiRateLimiter')
const restApiProxyMiddleware = require('./middleware/restApiProxy')
const wsApiProxyMiddleware = require('./middleware/wsApiProxy')
const errorHandler = require('./middleware/error')

const homeRoutes = require('./routes/home')
const overlayRoutes = require('./routes/overlay')
const authRoutes = require('./routes/auth')

const port = process.env.PORT || 3020

const app = express()

app.use(compression())

app.use(session({
	name: 'geoguessr-roulette',
	secret: keys.express.secret,
	saveUninitialized: true,
	resave: false,
	store: new MongoStore({
		mongoUrl: keys.mongo_url,
		ttl: 3600 * 24 * 365 * 2
	})
}))

app.use('/api/rest', apiRateLimiter, restApiProxyMiddleware)
app.use('/api/ws', apiRateLimiter, wsApiProxyMiddleware)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/overlay', overlayRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

;(async () => {
	try {
		app.listen(port)
	} catch (e) {
		console.error(e)
	}
})()
