import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/register/auth/Login";
import Register from "./components/register/auth/Register";
import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Route path="/" exact component={Landing} />
					<div className="container">
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
