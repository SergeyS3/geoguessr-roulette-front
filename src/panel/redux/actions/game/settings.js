import { GAME_SETTINGS_TIMER_CHANGE, GAME_SETTINGS_WILDCARD_TOGGLE, } from '../../types'

export const timerChange = (min, sec) => ({
	type: GAME_SETTINGS_TIMER_CHANGE,
	payload: +min + sec * 60
})

export const toggleWildcard = () => ({
	type: GAME_SETTINGS_WILDCARD_TOGGLE
})
