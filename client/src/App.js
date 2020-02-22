import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/register/auth/Login";
import Register from "./components/register/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";

// check for token
if (localStorage.jwtToken) {
	// set the auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		// clear current profile
		// redirect to login
		window.location.href = "/login";
	}
}

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Route path="/" exact component={Landing} />
					<div className="container">
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Switch>
							<PrivateRoute
								path="/dashboard"
								exact
								component={Dashboard}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								path="/create-profile"
								exact
								component={CreateProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								path="/edit-profile"
								exact
								component={EditProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								path="/add-experience"
								exact
								component={AddExperience}
							/>
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
