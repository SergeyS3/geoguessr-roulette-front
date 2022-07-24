import React, { useEffect } from 'react'
import Nav from './Nav'
import Loader from './bootstrap-components/Loader'
import Game from './Game'
import { fetchAuthData } from './redux/actions'
import { connect } from 'react-redux'

const App = props => {
	useEffect(() => {
		props.fetchAuthData()
	}, [])
	
	return (
		<Loader isReady={props.showLoader}>
			<Nav />
			<div className="container mt-3">
				{props.auth.user?.name
					? <Game />
					: <h3 className="text-danger">Not logged in</h3>
				}
			</div>
		</Loader>
	)
}

const mapsStateToProps = state => ({
	auth: state.auth,
	showLoader: !state.loaders.app,
})

const mapDispatchToProps = {
	fetchAuthData
}

export default connect(mapsStateToProps, mapDispatchToProps)(App)
