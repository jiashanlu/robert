import {
  UPDATE_ORDER,
  UPDATE_TOTAL,
  FORM_VALIDATED
} from '../actions/types.js';

const date = {
  now: new Date(),
  tomorrow() {
    return new Date(this.now.getTime() + 24 * 60 * 60 * 1000);
  }
};

const initialState = {
  order: [],
  total: 0,
  date: new Date(date.tomorrow()),
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
