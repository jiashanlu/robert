import { UPDATE_ORDER } from "./types";

//UPDATE ORDER

export const updateOrder = update => {
  return {
    type: UPDATE_ORDER,
    payload: update
  };
};
