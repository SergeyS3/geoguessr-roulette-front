import React from 'react'

export default props =>
	props.isReady
		? props.children
		: <div className="spinner-border text-primary" role="status"/>
