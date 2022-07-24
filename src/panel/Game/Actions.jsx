import React, { useEffect, useState } from 'react'
import Row from '../bootstrap-components/Row'
import NumberInput from '../bootstrap-components/NumberInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import Timer from '../../common/Timer'

export default props => {
	const [data, setData] = useState({})
	
	useEffect(() => {
		setData(props.data.actions)
	}, [props.data.actions, props.data.settings.timer])
	
	const set = (key, newVal) => props.onChange('actions', key, newVal)
	
	const resetTimer = () => {
		set('timerPaused', true)
		setTimeout(() => set('timerMsLeft', props.data.settings.timer * 1000), 1)
	}
	
	return (
		<>
			<h3>Actions</h3>
			<Row label="Streak">
				<div className="input-group input-group-streak">
					<NumberInput
						defaultValue={data.streak}
						key={data.streak}
						onBlur={e => set('streak', parseInt(e.target.value))}
					/>
					<Btn
						outline
						onClick={() => set('streak', data.streak + 1)}
					>+</Btn>
				</div>
				<div className="col-auto">
					<Btn
						danger
						disabled={!data.streak}
						onClick={() => {
							set('streak', 0)
							set('wildcard', true)
						}}
					>Reset</Btn>
				</div>
			</Row>
			<Row label="Timer">
				<div className="col-auto d-flex align-items-center justify-content-center timer-countdown">
					{typeof data.timerMsLeft !== 'undefined'
						? <Timer
							paused={data.timerPaused}
							msLeft={data.timerMsLeft}
							endTime={data.timerEndTime}
							OnStart={endTime => set('timerEndTime', endTime)}
							OnPause={msLeft => {
								set('timerMsLeft', msLeft)
								if(!msLeft)
									set('timerPaused', true)
							}}
						/>
						: ''
					}
				</div>
				<div className="col-auto">
					<Btn
						disabled={!data.timerMsLeft}
						warning={!data.timerPaused}
						className="timer-start-stop"
						onClick={() => set('timerPaused', !data.timerPaused)}
					>{data.timerPaused ? 'Start' : 'Pause'}</Btn>
				</div>
				<div className="col-auto">	
					<Btn
						warning
						onClick={resetTimer}
					>Reset</Btn>
				</div>
			</Row>
			<Row label="Wildcard">
				<div className="col-auto d-flex align-items-center">
					<Checkbox
						disabled={!props.data.settings.wildcard}
						checked={data.wildcard}
						onChange={e => set('wildcard', e.target.checked)}
					/>
				</div>
			</Row>
		</>
	)
}
