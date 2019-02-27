import { UPDATE_ORDER, UPDATE_TOTAL } from "../actions/types.js";

const initialState = {
  order: [],
  total: 0
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
    default:
      return state;
  }
}
