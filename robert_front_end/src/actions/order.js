import { UPDATE_ORDER, UPDATE_TOTAL } from "./types";

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
