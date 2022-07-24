import React, { useEffect, useRef, useState } from 'react'
import { splitSeconds } from './tools'

export default props => {
	const [msLeft, setMsLeft] = useState(0)
	const [min, setMin] = useState(0)
	const [sec, setSec] = useState(0)
	const timerIntervalId = useRef(0)
	
	const start = endTime => {
		if(timerIntervalId.current)
			return
		
		timerIntervalId.current = setInterval(() => {
			const msLeft = endTime - +new Date()
			if(msLeft > 0)
				setMsLeft(msLeft)
			else {
				setMsLeft(0)
				pause(0)
			}
		}, 75)
		
		props.OnStart && props.OnStart(endTime)
	}
	
	const pause = msLeft => {
		if(!timerIntervalId.current)
			return

		props.OnPause && props.OnPause(msLeft)
		
		clearInterval(timerIntervalId.current)
		timerIntervalId.current = 0
	}
	
	useEffect(() => {
		if(!props.paused)
			start(props.endTime)
	}, [props.endTime])
	
	useEffect(() => {
		if(props.paused)
			setMsLeft(props.msLeft)
	}, [props.msLeft])
	
	useEffect(() => 
		props.paused ? pause(msLeft) : start(msLeft + +new Date)
	, [props.paused])
	
	useEffect(() => {
		const [min, sec] = splitSeconds((msLeft + 999) / 1000)
		setMin(min)
		setSec(sec)
	}, [msLeft])
	
	return <>{min}:{sec}</>
}
