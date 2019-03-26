import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    'orders',
    'messages',
    'order',
    'errors',
    'path',
    'items',
    'auth',
    'areas'
  ]
};
const pReducer = persistReducer(rootPersistConfig, rootReducer);

const middleware = [thunk];
export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

export default store;
