import React, { forwardRef } from 'react'

export default forwardRef((props, ref) => {
	const { className, sm, outline, warning, danger, ...btnProps } = props
	
	const classes = ['btn']
	sm && classes.push('btn-sm')
	classes.push(outline ? 'btn-outline-primary' : 'btn-primary')
	warning && classes.push('btn-warning')
	danger && classes.push('btn-danger')
	className && classes.push(className)
	
	return (
		<button
			ref={ref}
			className={classes.join(' ')}
			{...btnProps}
		>
			{props.children}
		</button>
	)
})
