import { combineReducers } from 'redux';

import authReducer from './authReducer/authReducer';
import salesReducer from './salesReducer/salesReducer';
import usersReducer from './userReducer/userReducer';
import productsReducer from './productsReducer/productsReducer';
import categoryReducer from './categoryReducer/categoryReducer';
import cartReducer from './cartReducer/cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
  users: usersReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: cartReducer
});

export default rootReducer;
