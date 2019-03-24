import {
  UPDATE_ORDER,
  UPDATE_TOTAL,
  FORM_VALIDATED
} from '../actions/types.js';
const date = {
  now: new Date(),
  tommorow() {
    return new Date(this.now.getTime() + 24 * 60 * 60 * 1000);
  },
  format(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let year = date.getFullYear();
    let dateStr = year + '-' + month + '-' + day;
    return dateStr;
  }
};

const initialState = {
  order: [],
  total: 0,
  date: new Date(date.tommorow()),
  form_validated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return {
        ...state,
        order: [
          ...state.order.filter(order => order.id !== action.payload.id),
          action.payload
        ]
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.order.reduce(
          (preVal, elem) => preVal + Number(elem.price * elem.qty),
          0
        )
      };
    case FORM_VALIDATED:
      return {
        ...state,
        form_validated: action.payload
      };
    default:
      return state;
  }
}
