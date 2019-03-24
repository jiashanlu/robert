import { GET_ORDERS, NEW_ORDER, CLEAN_ORDERS } from '../actions/types.js';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case NEW_ORDER:
      return {
        ...state,
        last_order: action.payload
      };
    case CLEAN_ORDERS:
      return {
        orders: action.payload,
        last_order: action.payload
      };
    default:
      return state;
  }
}
