import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
} from "./types";

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("/api/profile", profileData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete account and profile
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This can not be undone")) {
		axios
			.delete("/api/profile")
			.then(res => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				});
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// add experience
export const addExperience = (newExperience, history) => dispatch => {
	axios
		.post("/api/profile/experience", newExperience)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// add experience
export const addEducation = (newEducation, history) => dispatch => {
	axios
		.post("/api/profile/education", newEducation)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
