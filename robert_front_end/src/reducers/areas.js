import { GET_AREAS, UPDATE_CO } from '../actions/types.js';

const initialState = {
  areas: [],
  co: { lat: 25.1714393, lng: 55.22058549 }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS:
      return {
        ...state,
        areas: action.payload
      };
    case UPDATE_CO:
      return {
        ...state,
        co: action.payload
      };
    default:
      return state;
  }
}
