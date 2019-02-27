import { combineReducers } from 'redux';

import authReducer from './authReducer/authReducer';
import salesReducer from './salesReducer/salesReducer';
import usersReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
  users: usersReducer
});

export default rootReducer;
