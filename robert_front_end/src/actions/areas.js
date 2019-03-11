import axios from 'axios';
import { returnErrors, createMessage } from './messages';
import { GET_AREAS, SET_TEST_ADDRESS } from './types';

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

export const confirmInArea = addr => dispatch => {
  if (addr) {
    dispatch({
      type: SET_TEST_ADDRESS,
      payload: addr
    });
    dispatch(
      createMessage({
        AddressOK: 'Good news! Robert delivers here! start our services now!'
      })
    );
  } else {
    dispatch(
      returnErrors({
        notAvailable: 'Not yet available, try another address or comeback later'
      })
    );
  }
};
