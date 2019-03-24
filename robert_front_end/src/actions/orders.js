import axios from 'axios';
import { returnErrors } from './messages';
import { GET_ORDERS, NEW_ORDER, CLEAN_ORDERS } from './types';
import { tokenConfig } from './auth';

// GET ITEMS
export const getOrders = () => (dispatch, getState) => {
  axios
    .get('http://localhost:8000/api/order/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const newOrder = data => (dispatch, getState) => {
  axios
    .post('http://localhost:8000/api/order/', data, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: NEW_ORDER,
        payload: res.data
      });
      dispatch(getOrders());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const cleanOrders = () => {
  return {
    type: CLEAN_ORDERS,
    payload: ''
  };
};
