import React from 'react'

export default props => {
	const { className, checked, ...inputProps } = props
	return (
		<input
			type="checkbox"
			checked={!!checked}
			className={`form-check-input ${props.className || ''}`}
			{...inputProps}
		/>
	)
}
