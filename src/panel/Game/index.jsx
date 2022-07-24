import React, { useEffect } from 'react'
import Loader from '../bootstrap-components/Loader'
import Settings from './Settings'
import Actions from './Actions'
import Players from './Players'
import { connect } from 'react-redux'
import { fetchGameData } from '../redux/actions'

const Game = props => {
	useEffect(() => {
		props.fetchGameData()
	}, [])

	return (
		<Loader isReady={props.showLoader}>
			<Settings />
			<Actions />
			<Players />
		</Loader>
	)
}

const mapsStateToProps = state => ({
	game: state.game,
	showLoader: !state.loaders.game,
})

const mapDispatchToProps = {
	fetchGameData
}

export default connect(mapsStateToProps, mapDispatchToProps)(Game)
