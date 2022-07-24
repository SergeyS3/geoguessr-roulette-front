import { _fetch } from '../../tools'
import { APP_HIDE_LOADER, AUTH_FETCH_DATA, GAME_FETCH_DATA, GAME_HIDE_LOADER } from '../types'

export function fetchAuthData() {
	return async dispatch => {
		const res = await _fetch('/auth')
		dispatch({ type: AUTH_FETCH_DATA, payload: await res.json() })
		dispatch({ type: APP_HIDE_LOADER })
	}
}

export function fetchGameData() {
	return async (dispatch, getState) => {
		const state = getState()
		const { login } = state.auth.user
		
		let res = await _fetch(`/api/rest/games/${state.auth.user.login}`)
		switch(res.status) {
			case 200:
				break
			case 404:
				res = await _fetch(`/api/rest/games`, 'POST', { login, ...state.game })
				if(res.status !== 201)
					return
				break
			default:
				return
		}
		
		const { settings, actions, players } = await res.json()
		dispatch({ type: GAME_FETCH_DATA, payload:  { settings, actions, players }})
		dispatch({ type: GAME_HIDE_LOADER })
	}
}
