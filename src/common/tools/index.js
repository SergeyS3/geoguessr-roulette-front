export const splitSeconds = seconds => {
	const min = Math.floor(seconds / 60)
	const sec = Math.floor(seconds - min * 60)
	return [min.toString(), `0${sec}`.slice(-2)]
}
