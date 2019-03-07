import { GET_AREAS, SET_TEST_ADDRESS } from '../actions/types.js';

const initialState = {
  areas: [],
  testAddress: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS:
      return {
        ...state,
        areas: action.payload
      };
    case SET_TEST_ADDRESS:
      return {
        ...state,
        testAddress: action.payload
      };
    default:
      return state;
  }
}
