import React, { useEffect, useState } from 'react'
import TextInput from '../bootstrap-components/TextInput'
import Btn from '../bootstrap-components/Btn'
import Checkbox from '../bootstrap-components/Checkbox'
import { rand } from '../tools'

export default props => {
	const [data, setData] = useState({})
	const [newName, setNewName] = useState('')
	
	useEffect(() => {
		setData(props.data.players)
	}, [props.data.players])
	
	const set = (key, newVal) => props.onChange('players', key, newVal)
	
	const add = name => {
		set('list', [...data.list, name])
		setNewName('')
	}
	const remove = name => set('list', data.list.filter(n => n !== name))
	
	const selectRandom = () => {
		const players = data.list.filter(n => !data.skipCurrent || n !== data.selected)
		set('selected', players[rand(0, players.length - 1)])
	}
	
	return (
		<div className="players">
			<h3>Players</h3>
			<table className="table table-striped table-hover align-middle players-table">
				<tbody>
					{data.list?.map(name => (
						<tr key={name} className={`${data.selected === name ? 'table-success' : ''}`}>
							<td>
								<Btn
									sm
									onClick={() => set('selected', name)}
								>Select</Btn>
							</td>
							<td>{name}</td>
							<td>
								<Btn
									danger
									sm
									onClick={() => remove(name)}
								>Remove</Btn>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="float-start">
				<Btn
					disabled={data.list?.length < 2}
					onClick={() => selectRandom()}
				>Select random player</Btn>
				<label className="form-check mt-1">
					<Checkbox
						checked={data.skipCurrent}
						onChange={e => set('skipCurrent', e.target.checked)}
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
					disabled={!newName || data.list?.find(p => p === newName)}
					onClick={() => add(newName)}
				>Add</Btn>
			</div>
		</div>
	)
}
