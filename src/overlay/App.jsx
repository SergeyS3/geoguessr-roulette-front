import React, { useEffect, useState } from 'react'
import Timer from '../common/Timer'
import WsWatcher from '../common/tools/wsWatcher'

export default () => {
	const [data, setData] = useState({})
	
	useEffect(() => {
		const wsWatcher = new WsWatcher(window.location.search.substr(1)).on('data', setData)
		return () => wsWatcher.destroy()
	}, [])
	
	if(!Object.keys(data).length)
		return <h2>No game data</h2>
	
	return (
		<div className="container">
			<div>
				<div className="header">
					<div>streak: {data.actions.streak}</div>
					<div className={data.actions.timerPaused ? (data.actions.timerMsLeft ? '' : 'red') : 'yellow'}>
						<Timer
							paused={data.actions.timerPaused}
							msLeft={data.actions.timerMsLeft}
							endTime={data.actions.timerEndTime}
						/>
					</div>
				</div>
				<div className="players-table">
					<div className="players-table-header">
						Players:
						{data.settings.wildcard ? 
							<div className={`wildcard ${data.actions.wildcard ? 'green' : 'gray'}`}>
								{data.actions.wildcard ? '✔' : '❌'}wildcard
							</div>
						: ''}
					</div>
					<div className="players-table-list">
						{data.players.list.map(name => {
							const selected = name === data.players.selected
							return (
								<div key={name} className={selected ? 'green' : ''}>
									{name}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
