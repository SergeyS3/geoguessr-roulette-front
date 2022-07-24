import { GAME_SETTINGS_TIMER_CHANGE, GAME_SETTINGS_WILDCARD_TOGGLE } from '../../types'

const initialState = {
	timer: 90,
	wildcard: true
}

export default (state = initialState, action) => {
	switch(action.type) {
		case GAME_SETTINGS_TIMER_CHANGE:
			return { ...state, timer: action.payload }
		case GAME_SETTINGS_WILDCARD_TOGGLE:
			return { ...state, wildcard: !state.wildcard }
		default: return state
	}
}
