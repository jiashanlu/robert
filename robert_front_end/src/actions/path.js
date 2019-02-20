import { NEW_PATH } from "./types";

// CREATE MESSAGE

export const newPath = path => {
  return {
    type: NEW_PATH,
    payload: path
  };
};
