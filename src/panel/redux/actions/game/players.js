import { rand } from '../../../tools'
import {
	GAME_PLAYERS_SELECT, GAME_PLAYERS_REMOVE, GAME_PLAYERS_SKIP_CURRENT_TOGGLE,	GAME_PLAYERS_ADD
} from '../../types'

export const select = name => ({
	type: GAME_PLAYERS_SELECT,
	payload: name
})

export const remove = name => ({
	type: GAME_PLAYERS_REMOVE,
	payload: name
})

export const selectRandom = () => 
	(dispatch, getState) => {
		const state = getState().game.players
		const players = state.list.filter(n => !state.skipCurrent || n !== state.selected)
		dispatch({
			type: GAME_PLAYERS_SELECT,
			payload: players[rand(0, players.length - 1)]
		})
	}

export const toggleSkipCurrent = () => ({
	type: GAME_PLAYERS_SKIP_CURRENT_TOGGLE
})

export const add = name => ({
	type: GAME_PLAYERS_ADD,
	payload: name
})
