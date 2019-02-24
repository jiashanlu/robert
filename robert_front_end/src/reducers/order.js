import { UPDATE_ORDER } from "../actions/types.js";

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

    default:
      return state;
  }
}
