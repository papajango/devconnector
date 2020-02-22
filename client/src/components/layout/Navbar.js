import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.clearCurrentProfile();
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<div className="collapse navbar-collapse" id="mobile-nav">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<a
							href=""
							onClick={this.onLogoutClick}
							className="nav-link"
						>
							<img
								style={{ width: "25px", marginRight: "5px" }}
								src={user.avatar}
								alt={user.name}
								title="You must have a gravatar connected to your email to display an image"
							/>
							Logout
						</a>
					</li>
				</ul>
			</div>
		);
		const guestLinks = (
			<div className="collapse navbar-collapse" id="mobile-nav">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to="/register" className="nav-link">
							Sign up
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Login
						</Link>
					</li>
				</ul>
			</div>
		);
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						DevConnector
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	logoutUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
	Navbar
);
