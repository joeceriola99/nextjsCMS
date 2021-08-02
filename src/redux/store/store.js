import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducer/rootReducer';
import loggerMiddleware from '../middleware/logger';

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(rootReducer, undefined, middlewareEnhancer);
const persistor = persistStore(store);

export { store, persistor };
