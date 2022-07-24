export const _fetch = async (url, method = 'GET', data = null) => {
	try {
		return await fetch(url, {
			method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: data ? JSON.stringify(data) : null
		})
	} catch (e) {
		console.error(e)
	}
}

export const rand = (min, max) => (Math.random() * (++max - min) >> 0) + min
