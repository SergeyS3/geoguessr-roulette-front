import React, { useState } from 'react'
import TextInput from '../bootstrap-components/TextInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import { connect } from 'react-redux'
import {
	add,
	remove,
	select,
	selectRandom,
	toggleSkipCurrent
} from '../redux/actions/game/players'

const Players = props => {
	const [newName, setNewName] = useState('')
	
	const add = name => {
		props.add(name)
		setNewName('')
	}
	
	return (
		<>
			<div className="players">
				<h3>Players</h3>
				<table className="table table-striped table-hover align-middle players-table">
					<tbody>
						{props.players.list?.map(name => (
							<tr key={name} className={`${props.players.selected === name ? 'table-success' : ''}`}>
								<td>
									<Btn
										sm
										onClick={() => props.select(name)}
									>Select</Btn>
								</td>
								<td>{name}</td>
								<td>
									<Btn
										danger
										sm
										onClick={() => props.remove(name)}
									>Remove</Btn>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="float-start">
					<Btn
						disabled={props.players.list?.length < 2}
						onClick={() => props.selectRandom()}
					>Select random player</Btn>
					<label className="form-check mt-1">
						<Checkbox
							checked={props.players.skipCurrent}
							onChange={props.toggleSkipCurrent}
						/>
						Skip current player
					</label>
				</div>
				<div className="input-group input-group-username float-end">
					<TextInput
						placeholder="username"
						value={newName}
						onChange={e => setNewName(e.target.value)}
					/>
					<Btn
						outline
						disabled={!newName || props.players.list?.find(p => p === newName)}
						onClick={() => add(newName)}
					>Add</Btn>
				</div>
			</div>
		</>
	)
}

const mapsStateToProps = state => ({
	players: state.game.players
})

const mapDispatchToProps = {
	select,
	remove,
	selectRandom,
	toggleSkipCurrent,
	add,
}

export default connect(mapsStateToProps, mapDispatchToProps)(Players)
