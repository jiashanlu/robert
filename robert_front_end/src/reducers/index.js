import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import storage from 'redux-persist/lib/storage';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import path from './path';
import items from './items';
import order from './order';

const orderPersistConfig = {
  key: 'order',
  storage: storage,
  whitelist: ['order', 'total']
};

export default combineReducers({
  errors,
  messages,
  auth,
  path,
  items,
  order: persistReducer(orderPersistConfig, order)
});
