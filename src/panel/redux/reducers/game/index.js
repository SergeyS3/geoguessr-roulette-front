import { combineReducers } from 'redux'
import settings from './settings'
import actions from './actions'
import players from './players'
import { GAME_FETCH_DATA } from '../../types'

const gameReducer = combineReducers({
	settings,
	actions,
	players,
})

export default (state, action) => {
	switch(action.type) {
		case GAME_FETCH_DATA:
			return action.payload
		default:
			return gameReducer(state, action)
	}
}
