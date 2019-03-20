import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';

import storage from 'redux-persist/lib/storage';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import path from './path';
import items from './items';
import order from './order';
import areas from './areas';

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
  order: persistReducer(orderPersistConfig, order),
  areas,
  form: formReducer
});
