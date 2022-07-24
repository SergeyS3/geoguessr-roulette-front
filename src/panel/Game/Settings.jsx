import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Popover } from 'bootstrap'
import Row from '../bootstrap-components/Row'
import TextInput from '../bootstrap-components/TextInput'
import NumberInput from '../bootstrap-components/NumberInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import { splitSeconds } from '../../common/tools'
import { timerChange, toggleWildcard } from '../redux/actions/game/settings'

const Settings = props => {
	const copyLinkRef = useRef()
	const overlayLink = `${location.href}overlay?${props.login}`
	
	const [timerMin, timerSec] = splitSeconds(props.settings.timer)
	
	useEffect(() => {
		new Popover(copyLinkRef.current, {
			content: 'Copied',
			placement: 'top',
			trigger: 'focus',
		})
	}, [copyLinkRef.current])
	
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
						defaultValue={timerMin}
						key={timerMin}
						onBlur={e => props.timerChange(timerSec, e.target.value)}
					/>
				</div>
				<div className="input-group input-group-timer">
					<span className="input-group-text">sec:</span>
					<NumberInput
						defaultValue={timerSec}
						key={timerSec}
						onBlur={e => props.timerChange(e.target.value, timerMin)}
					/>
				</div>
			</Row>
			<Row label="Wildcard">
				<div className="col-auto d-flex align-items-center">
					<Checkbox
						checked={props.settings.wildcard}
						onChange={e => props.toggleWildcard()}
					/>
				</div>
			</Row>
		</>
	)
}

const mapsStateToProps = state => ({
	login: state.auth.user.login,
	settings: state.game.settings,
})

const mapDispatchToProps = {
	timerChange,
	toggleWildcard,
}

export default connect(mapsStateToProps, mapDispatchToProps)(Settings)
