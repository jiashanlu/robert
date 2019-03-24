import { GET_ORDERS, NEW_ORDER, CLEAN_ORDERS } from '../actions/types.js';
import moment from 'moment';
const initialState = {
  tomorrow_done: false
};
const tomorrow = moment(new Date())
  .add(1, 'days')
  .format('YYYY-MM-DD');
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        tomorrow_done:
          action.payload.filter(order => order.date === tomorrow).length > 0
            ? true
            : false
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
