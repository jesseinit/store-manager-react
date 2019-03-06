import { combineReducers } from 'redux';

import authReducer from './authReducer/authReducer';
import salesReducer from './salesReducer/salesReducer';
import usersReducer from './userReducer/userReducer';
import productsReducer from './productsReducer/productsReducer';
import categoryReducer from './categoryReducer/categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
  users: usersReducer,
  products: productsReducer,
  categories: categoryReducer
});

export default rootReducer;
