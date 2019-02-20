import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import path from "./path";

export default combineReducers({
  errors,
  messages,
  auth,
  path
});
