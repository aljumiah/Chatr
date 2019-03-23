import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header although its not needed here because this is not a new login this
        // get the token from the local storage and checks for it's expiry date
        setAuthToken(token);
        //to store the user locally in the reducer
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};
const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const login = (userData, history, fetch) => {
  return async dispatch => {
    try {
      let response = await instance.post("login/", userData);
      let user = response.data;
      console.log(user);
      setAuthToken(user.token);
      dispatch(setCurrentUser(jwt_decode(user.token)));
      history.push("/welcome");
      fetch();
    } catch (err) {
      console.error(err.response);
      setErrors(err.response);
    }
  };
};

export const signup = (userData, history,fetch) => {
  return async dispatch => {
    try {
      let response = await instance.post("signup/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/welcome");
      console.log(user.token);
      fetch();
      
    } catch (err) {
      console.error(err.response);
      setErrors(err.response);
    }
  };
};

export const logout = history => {
  setAuthToken();
  history.push("/login");
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
