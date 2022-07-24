import React from 'react'
import { connect } from 'react-redux'
import Row from '../bootstrap-components/Row'
import NumberInput from '../bootstrap-components/NumberInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import Timer from '../../common/Timer'
import {
	streakChange,
	streakIncrement,
	streakReset,
	timerEndTimeChange,
	timerMsLeftChange,
	timerReset,
	timerStatusToggle,
	toggleWildcard
} from '../redux/actions/game/actions'

const Actions = props => (
	<>
		<h3>Actions</h3>
		<Row label="Streak">
			<div className="input-group input-group-streak">
				<NumberInput
					defaultValue={props.actions.streak}
					key={props.actions.streak}
					onBlur={props.streakChange}
				/>
				<Btn
					outline
					onClick={props.streakIncrement}
				>+</Btn>
			</div>
			<div className="col-auto">
				<Btn
					danger
					disabled={!props.actions.streak}
					onClick={props.streakReset}
				>Reset</Btn>
			</div>
		</Row>
		<Row label="Timer">
			<div className="col-auto d-flex align-items-center justify-content-center timer-countdown">
				<Timer
					paused={props.actions.timerPaused}
					msLeft={props.actions.timerMsLeft}
					endTime={props.actions.timerEndTime}
					OnStart={props.timerEndTimeChange}
					OnPause={props.timerMsLeftChange}
				/>
			</div>
			<div className="col-auto">
				<Btn
					disabled={!props.actions.timerMsLeft}
					warning={!props.actions.timerPaused}
					className="timer-start-stop"
					onClick={props.timerStatusToggle}
				>{props.actions.timerPaused ? 'Start' : 'Pause'}</Btn>
			</div>
			<div className="col-auto">	
				<Btn
					warning
					onClick={props.timerReset}
				>Reset</Btn>
			</div>
		</Row>
		<Row label="Wildcard">
			<div className="col-auto d-flex align-items-center">
				<Checkbox
					disabled={!props.settings.wildcard}
					checked={props.actions.wildcard}
					onChange={props.toggleWildcard}
				/>
			</div>
		</Row>
	</>
)

const mapsStateToProps = state => ({
	actions: state.game.actions,
	settings: state.game.settings
})

const mapDispatchToProps = {
	streakChange,
	streakIncrement,
	streakReset,
	timerStatusToggle,
	timerEndTimeChange,
	timerMsLeftChange,
	timerReset,
	toggleWildcard,
}

export default connect(mapsStateToProps, mapDispatchToProps)(Actions)
