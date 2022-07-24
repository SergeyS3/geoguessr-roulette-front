import {
	GAME_ACTIONS_STREAK_CHANGE, GAME_ACTIONS_STREAK_INCREMENT, GAME_ACTIONS_STREAK_RESET,
	GAME_ACTIONS_TIMER_STATUS_TOGGLE, GAME_ACTIONS_TIMER_END_TIME_CHANGE, GAME_ACTIONS_TIMER_MS_LEFT_CHANGE,
	GAME_ACTIONS_WILDCARD_TOGGLE,
} from '../../types'

export const streakChange = e => ({
	type: GAME_ACTIONS_STREAK_CHANGE,
	payload: +e.target.value
})

export const streakIncrement = () => ({
	type: GAME_ACTIONS_STREAK_INCREMENT
})

export const streakReset = () => ({
	type: GAME_ACTIONS_STREAK_RESET
})

export const timerStatusToggle = () => ({
	type: GAME_ACTIONS_TIMER_STATUS_TOGGLE
})

export const timerEndTimeChange = val => ({
	type: GAME_ACTIONS_TIMER_END_TIME_CHANGE,
	payload: val
})

const timerPause = () =>
	(dispatch, getState) => {
		if(!getState().game.actions.timerPaused)
			dispatch(timerStatusToggle())
	}

export const timerMsLeftChange = msLeft =>
	dispatch => {
		dispatch({
			type: GAME_ACTIONS_TIMER_MS_LEFT_CHANGE,
			payload: msLeft
		})
		if(!msLeft)
			dispatch(timerPause())
	}

export const timerReset = () =>
	(dispatch, getState) => {
		dispatch(timerPause())
		setTimeout(() => {
			dispatch({
				type: GAME_ACTIONS_TIMER_MS_LEFT_CHANGE,
				payload: getState().game.settings.timer * 1000
			})
		}, 0)
	}

export const toggleWildcard = () => ({
	type: GAME_ACTIONS_WILDCARD_TOGGLE
})
