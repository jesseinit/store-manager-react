import decodeJwt from 'jwt-decode';
import {
  USER_LOGGED_OUT,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  CLEAR_LOGIN_ERRORS
} from '../../actions/authActions/authActions';

const token = localStorage.getItem('user');

const initialAuthState = {
  isAuthenticated: Boolean(token),
  userRole: token ? decodeJwt(token).role : 'guest',
  loginErrors: [],
  isLoading: false
};

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_LOADING:
      return { ...state, isLoading: payload };
    case USER_LOGIN_ERROR:
      return { ...state, loginErrors: [...payload], isLoading: false };
    case USER_LOGIN_SUCCESS:
      return { ...state, ...payload, loginErrors: [], isLoading: false };
    case CLEAR_LOGIN_ERRORS:
      return { ...state, loginErrors: [] };
    case USER_LOGGED_OUT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default authReducer;
