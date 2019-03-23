import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { GET_AREAS } from './types';

// GET AREAS
export const getAreas = () => dispatch => {
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
