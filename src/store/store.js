import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const allStoreEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, allStoreEnhancers);

export default store;
