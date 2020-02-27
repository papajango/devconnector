import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(...middleWare))
);

// set up a store subscription listener
// to store the users token in localStorage

let currentState;

store.subscribe(() => {
	// keep track of the previous and current state to compare changes
	let previousState = currentState;
	currentState = store.getState();
	// if the token changes set the value in localStorage
	if (previousState && previousState.auth.token !== currentState.auth.token) {
		const token = currentState.auth.token;
		token
			? localStorage.setItem('token', token)
			: localStorage.removeItem('token');
	}
});

export default store;
