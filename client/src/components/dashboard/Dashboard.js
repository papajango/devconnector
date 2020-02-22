import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		console.log("props", this.props);
		return <div>dashboard</div>;
	}
}

const mapStateToProps = state => ({
	profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
