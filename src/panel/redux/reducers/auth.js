import { AUTH_FETCH_DATA } from '../types'

export default (state = {}, action) => {
	switch(action.type) {
		case AUTH_FETCH_DATA:
			return action.payload
		default: return state
	}
}
