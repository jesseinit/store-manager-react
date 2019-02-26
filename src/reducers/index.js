import { combineReducers } from 'redux';

import authReducer from './authReducer/authReducer';
import salesReducer from './salesReducer/salesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer
});

export default rootReducer;
