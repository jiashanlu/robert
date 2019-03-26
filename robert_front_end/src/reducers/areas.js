import { GET_AREAS, UPDATE_CO, AREAS_LOADING } from '../actions/types.js';

const initialState = {
  areas: [],
  co: { lat: 25.1714393, lng: 55.22058549 }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AREAS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_AREAS:
      return {
        ...state,
        areas: action.payload,
        isLoading: false
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
