import { GET_ITEMS, ITEMS_LOADING } from '../actions/types.js';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
