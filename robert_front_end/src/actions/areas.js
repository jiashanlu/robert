import axios from 'axios';
import { returnErrors } from './messages';
import { GET_AREAS, UPDATE_CO, AREAS_LOADING } from './types';

// GET AREAS
export const getAreas = () => dispatch => {
  dispatch({ type: AREAS_LOADING });
  axios
    .get('http://localhost:8000/api/areas')
    .then(res => {
      dispatch({
        type: GET_AREAS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateCo = co => {
  return dispatch => {
    dispatch({
      type: UPDATE_CO,
      payload: co
    });
  };
};
