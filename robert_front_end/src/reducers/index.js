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
import orders from './orders';
import areas from './areas';

const orderPersistConfig = {
  key: 'order',
  storage: storage,
  whitelist: ['order', 'total', 'form_validated']
};

const pathPersistConfig = {
  key: 'path',
  storage: storage,
  whitelist: ['accountTab']
};

export default combineReducers({
  errors,
  messages,
  auth,
  path: persistReducer(pathPersistConfig, path),
  items,
  order: persistReducer(orderPersistConfig, order),
  orders,
  areas,
  form: formReducer
});
