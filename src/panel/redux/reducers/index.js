import { combineReducers } from 'redux'
import loaders from './loaders'
import auth from './auth'
import game from './game'

export default combineReducers({
	loaders,
	auth,
	game
})
