import axios from 'axios';
import { returnErrors } from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// LOGIN USER
export const login = (username, password, email) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = JSON.stringify({ username, password, email });
  console.log(body);
  axios
    .post('http://localhost:8000/rest-auth/login/', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// FACEBOOK LOGIN USER
export const loginFacebook = () => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = {
    code: '607f32621df274daf77a891c329054d7'
  };
  axios
    .post('http://localhost:8000/rest-auth/facebook/', body, config)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

// REGISTER USER
export const register = ({
  username,
  password1,
  password2,
  email
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, password1, password2, email });

  axios
    .post('http://localhost:8000/rest-auth/registration/', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('http://localhost:8000/rest-auth/logout/')
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axios
    .get('http://localhost:8000/rest-auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Setup confi with toke -helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // if token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  console.log(config);
  return config;
};
