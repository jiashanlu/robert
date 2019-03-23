import { GET_AREAS } from '../actions/types.js';

const initialState = {
  areas: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS:
      return {
        ...state,
        areas: action.payload
      };
    default:
      return state;
  }
}
