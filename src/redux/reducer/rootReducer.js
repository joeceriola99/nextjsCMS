import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistCombineReducers } from 'redux-persist';
import cartReducer from './cartReducer';
import publicReducer from './publicReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartData', 'public'],
};

const rootReducer = persistCombineReducers(persistConfig, {
  cartData: cartReducer,
  public: publicReducer,
});

export default rootReducer;
