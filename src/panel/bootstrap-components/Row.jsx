import React from 'react'

export default props => (
	<div className="row mb-3">
		<div className="col-1 fw-bold text-end">
			<label className="col-form-label">{props.label}:</label>
		</div>
		{props.children}
	</div>
)
