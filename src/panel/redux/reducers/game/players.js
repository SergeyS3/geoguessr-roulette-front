import {
	GAME_PLAYERS_ADD, GAME_PLAYERS_REMOVE, GAME_PLAYERS_SELECT, GAME_PLAYERS_SKIP_CURRENT_TOGGLE
} from '../../types'

const initialState = {
	list: [],
	skipCurrent: true,
	selected: ''
}

export default (state = initialState, action) => {
	switch(action.type) {
		case GAME_PLAYERS_SELECT:
			return { ...state, selected: action.payload }
		case GAME_PLAYERS_REMOVE:
			return { ...state, list: state.list.filter(p => p !== action.payload) }
		case GAME_PLAYERS_SKIP_CURRENT_TOGGLE:
			return { ...state, skipCurrent: !state.skipCurrent }
		case GAME_PLAYERS_ADD:
			return { ...state, list: [ ...state.list, action.payload ] }
		default: return state
	}
}
