import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Loader from './bootstrap-components/Loader'
import Game from './Game'

export default () => {
	const [authData, setAuthData] = useState({})
	
	useEffect(() => {
		fetch('/auth')
			.then(res =>
				res.json().then(setAuthData)
			)
	}, [])
	
	return (
		<Loader isReady={Object.keys(authData).length}>
			<Nav {...authData} />
			<div className="container mt-3">
				{authData.user?.name ? <Game login={authData.user.login}/> : <h3 className="text-danger">Not logged in</h3>}
			</div>
		</Loader>
	)
}
