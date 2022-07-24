import React from 'react'
import TextInput from './TextInput'

const checkNum = e => {
	if(
		(e.keyCode < 48 || e.keyCode > 57) //not num key
		&& (e.keyCode < 96 || e.keyCode > 105) //not numpad num key
		&& ![8, 35, 36, 37, 39, 46].includes(e.keyCode) //not backspace, end, home, arrows, del
	)
		e.preventDefault()
}

export default props => {
	return (
		<TextInput
			onKeyDown={checkNum}
			{...props}
		/>
	)
}
