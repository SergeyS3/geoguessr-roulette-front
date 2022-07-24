import { APP_HIDE_LOADER, GAME_HIDE_LOADER } from '../types'

const initialState = {
	app: true,
	game: true,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case APP_HIDE_LOADER:
			return { ...state, app: false }
		case GAME_HIDE_LOADER:
			return { ...state, game: false }
		default: return state
	}
}
