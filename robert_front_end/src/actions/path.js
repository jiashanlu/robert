import { NEW_PATH, NEW_ACCOUNT_TAB } from './types';

// CREATE MESSAGE

export const newPath = path => {
  return {
    type: NEW_PATH,
    payload: path
  };
};

export const newAccountTab = tab => {
  return {
    type: NEW_ACCOUNT_TAB,
    payload: tab
  };
};
