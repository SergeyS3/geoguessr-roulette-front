import React  from 'react'

export default props => {
	const { className, invalid, ...inputProps } = props
	return (
		<input
			type="text"
			className={`form-control ${className || ''} ${invalid ? 'is-invalid' : ''}`}
			{...inputProps}
		/>
	)
}
