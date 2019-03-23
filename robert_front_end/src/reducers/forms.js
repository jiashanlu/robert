import { LOAD_ORDER_FORM } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDER_FORM:
      return {
        data: action.payload
      };
    default:
      return state;
  }
}
