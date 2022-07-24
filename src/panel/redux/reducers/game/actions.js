import {
	GAME_ACTIONS_STREAK_CHANGE, GAME_ACTIONS_STREAK_INCREMENT, GAME_ACTIONS_STREAK_RESET,
	GAME_ACTIONS_TIMER_END_TIME_CHANGE, GAME_ACTIONS_TIMER_MS_LEFT_CHANGE, GAME_ACTIONS_TIMER_STATUS_TOGGLE,
	GAME_ACTIONS_WILDCARD_TOGGLE
} from '../../types'

const initialState = {
	streak: 0,
	timerPaused: true,
	timerEndTime: 0,
	timerMsLeft: 90_000,
	wildcard: true
}

export default (state = initialState, action) => {
	switch(action.type) {
		case GAME_ACTIONS_STREAK_CHANGE:
			return { ...state, streak: action.payload }
		case GAME_ACTIONS_STREAK_INCREMENT:
			return { ...state, streak: state.streak + 1 }
		case GAME_ACTIONS_STREAK_RESET:
			return { ...state, streak: 0, wildcard: true }
		case GAME_ACTIONS_TIMER_STATUS_TOGGLE:
			return { ...state, timerPaused: !state.timerPaused }
		case GAME_ACTIONS_TIMER_END_TIME_CHANGE:
			return { ...state, timerEndTime: action.payload }
		case GAME_ACTIONS_TIMER_MS_LEFT_CHANGE:
			return { ...state, timerMsLeft: action.payload }
		case GAME_ACTIONS_WILDCARD_TOGGLE:
			return { ...state, wildcard: !state.wildcard }
		default: return state
	}
}
