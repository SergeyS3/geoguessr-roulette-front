import { takeEvery, select } from 'redux-saga/effects'
import { _fetch } from '../tools'
import {
	GAME_SETTINGS_TIMER_CHANGE, GAME_SETTINGS_WILDCARD_TOGGLE, GAME_ACTIONS_STREAK_CHANGE,
	GAME_ACTIONS_STREAK_INCREMENT, GAME_ACTIONS_STREAK_RESET, GAME_ACTIONS_TIMER_STATUS_TOGGLE,
	GAME_ACTIONS_TIMER_END_TIME_CHANGE, GAME_ACTIONS_TIMER_MS_LEFT_CHANGE, GAME_ACTIONS_WILDCARD_TOGGLE,
	GAME_PLAYERS_SELECT, GAME_PLAYERS_REMOVE, GAME_PLAYERS_SKIP_CURRENT_TOGGLE,	GAME_PLAYERS_ADD,
} from './types'

export function* sagaWatcher() {
	yield takeEvery(GAME_SETTINGS_TIMER_CHANGE, saveGameState)
	yield takeEvery(GAME_SETTINGS_WILDCARD_TOGGLE, saveGameState)
	yield takeEvery(GAME_ACTIONS_STREAK_CHANGE, saveGameState)
	yield takeEvery(GAME_ACTIONS_STREAK_INCREMENT, saveGameState)
	yield takeEvery(GAME_ACTIONS_STREAK_RESET, saveGameState)
	yield takeEvery(GAME_ACTIONS_TIMER_STATUS_TOGGLE, saveGameState)
	yield takeEvery(GAME_ACTIONS_TIMER_END_TIME_CHANGE, saveGameState)
	yield takeEvery(GAME_ACTIONS_TIMER_MS_LEFT_CHANGE, saveGameState)
	yield takeEvery(GAME_ACTIONS_WILDCARD_TOGGLE, saveGameState)
	yield takeEvery(GAME_PLAYERS_SELECT, saveGameState)
	yield takeEvery(GAME_PLAYERS_REMOVE, saveGameState)
	yield takeEvery(GAME_PLAYERS_SKIP_CURRENT_TOGGLE, saveGameState)
	yield takeEvery(GAME_PLAYERS_ADD, saveGameState)
}

function* saveGameState() {
	const state = yield select()
	_fetch(`/api/rest/games/${state.auth.user.login}`, 'PUT', state.game)
}
