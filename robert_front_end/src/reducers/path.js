import { NEW_PATH, NEW_ACCOUNT_TAB } from '../actions/types';

const initialState = {
  pathName: null,
  accountTab: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_PATH:
      return {
        ...state,
        pathName: action.payload
      };
    case NEW_ACCOUNT_TAB:
      return {
        ...state,
        accountTab: action.payload
      };
    default:
      return state;
  }
}
