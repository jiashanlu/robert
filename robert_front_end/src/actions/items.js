import axios from 'axios';
import { returnErrors } from './messages';
import { GET_ITEMS, ITEMS_LOADING } from './types';

// GET ITEMS
export const getItems = () => (dispatch, getState) => {
  dispatch({ type: ITEMS_LOADING });
  axios
    .get('http://localhost:8000/api/items')
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
