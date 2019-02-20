import { NEW_PATH } from "../actions/types";

const initialState = {
  pathName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_PATH:
      return {
        pathName: action.payload
      };
    default:
      return state;
  }
}
