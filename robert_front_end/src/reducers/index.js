import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import path from "./path";
import items from "./items";
import order from "./order";

export default combineReducers({
  errors,
  messages,
  auth,
  path,
  items,
  order
});
