import { UPDATE_ORDER, UPDATE_TOTAL, FORM_VALIDATED } from './types';

export const updateOrder = update => {
  return dispatch => {
    dispatch({
      type: UPDATE_ORDER,
      payload: update
    });
    dispatch({
      type: UPDATE_TOTAL
    });
  };
};

export const formValidated = action => {
  return dispatch => {
    dispatch({
      type: FORM_VALIDATED,
      payload: action
    });
  };
};
