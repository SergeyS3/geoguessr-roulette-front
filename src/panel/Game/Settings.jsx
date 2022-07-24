import React, { useEffect, useRef, useState } from 'react'
import { Popover } from 'bootstrap'
import Row from '../bootstrap-components/Row'
import TextInput from '../bootstrap-components/TextInput'
import NumberInput from '../bootstrap-components/NumberInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import { splitSeconds } from '../../common/tools'

export default props => {
	const [data, setData] = useState({})
	const copyLinkRef = useRef()
	const overlayLink = `${location.href}overlay?${props.login}`
	
	useEffect(() => {
		const data = props.data.settings
		;[data.timerMin, data.timerSec] = splitSeconds(data.timer)
		
		setData(data)
	}, [props.data.settings])
	
	useEffect(() => {
		new Popover(copyLinkRef.current, {
			content: 'Copied',
			placement: 'top',
			trigger: 'focus',
		})
	}, [copyLinkRef.current])
	
	const set = (key, newVal) => {
		if(['timerMin', 'timerSec'].includes(key)) {
			data[key] = newVal
			key = 'timer'
			newVal = data.timerMin * 60 + +data.timerSec 
		}
		props.onChange('settings', key, newVal)
	}
	
	return (
		<>
			<h3>Settings</h3>
			<Row label="Overlay">
				<div className="col-auto">
					<TextInput
						readOnly
						defaultValue={overlayLink}
						className="overlay-input"
					/>
				</div>
				<div className="col-auto">
					<Btn
						ref={copyLinkRef}
						onClick={() => navigator.clipboard.writeText(overlayLink)}
					>Copy</Btn>
				</div>
			</Row>
			<Row label="Timer">
				<div className="input-group input-group-timer">
					<span className="input-group-text">min:</span>
					<NumberInput
						defaultValue={data.timerMin}
						onBlur={e => set('timerMin', e.target.value)}
					/>
				</div>
				<div className="input-group input-group-timer">
					<span className="input-group-text">sec:</span>
					<NumberInput
						defaultValue={data.timerSec}
						onBlur={e => set('timerSec', e.target.value)}
					/>
				</div>
			</Row>
			<Row label="Wildcard">
				<div className="col-auto d-flex align-items-center">
					<Checkbox
						checked={data.wildcard}
						onChange={e => set('wildcard', e.target.checked)}
					/>
				</div>
			</Row>
		</>
	)
}
