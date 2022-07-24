import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Loader from '../bootstrap-components/Loader'
import Settings from './Settings'
import Actions from './Actions'
import Players from './Players'
import GamesService from '../GamesService'

export default ({ login }) => {
	const [data, setData] = useState({})
	const [isReady, setIsReady] = useState(false)
	
	const gamesService = useMemo(() => new GamesService(login), [])
	
	useEffect(() => {
		gamesService.getList().then(setData)
	}, [])
	
	const change = useCallback((key, subKey, newVal) => {
		setData(data => {
			if(data[key][subKey]?.toString() === newVal.toString())
				return data
			
			data[key][subKey] = newVal
			
			return {
				settings: { ...data.settings },
				actions: { ...data.actions },
				players: { ...data.players },
			}
		})
	}, [])
	
	useEffect(() => {
		if(isReady)
			gamesService.update(data)
		else if(Object.keys(data).length)
			setIsReady(true)
		
	}, [data])
	
	return (
		<Loader isReady={isReady}>
			<Settings data={data} onChange={change} login={login}/>
			<Actions data={data} onChange={change}/>
			<Players data={data} onChange={change}/>
		</Loader>
	)
}
