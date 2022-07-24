import React from 'react'
import { connect } from 'react-redux'
import './Nav.css'

const Nav = props => {
	const { OAuthData: { client_id, redirect_uri }, user } = props.auth
	const twitchOAuthParams = new URLSearchParams({
		client_id,
		redirect_uri,
		response_type: 'code'
	})
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<b className="navbar-brand">Geoguessr roulette panel</b>
				<ul className="navbar-nav d-flex align-items-center">
					{user.name ? (
						<>
							<li className="nav-item">
								<img src={user.pic} className="avatar" />
							</li>
							<li className="nav-item text-secondary">
								{user.name}
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/auth/logout">Logout</a>
							</li>
						</>
					) :
						<li className="nav-item">
							<a className="nav-link" href={`https://id.twitch.tv/oauth2/authorize?${twitchOAuthParams}`}>Login</a>
						</li>
					}
				</ul>
			</div>
		</nav>
	)
}

const mapsStateToProps = state => ({
	auth: state.auth
})

export default connect(mapsStateToProps)(Nav)
