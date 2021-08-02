import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistCombineReducers } from 'redux-persist';
import initialReducer from './initialReducer';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartData'],
};
const rootReducer = persistCombineReducers(persistConfig, {
  cartData: initialReducer,
});
export default rootReducer;
