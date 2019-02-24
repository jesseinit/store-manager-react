import decodeJwt from 'jwt-decode';
import Util from '../utils';

export const USER_LOGIN_LOADING = 'USER_LOGIN_STARTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_FAILED';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const userLoginLoading = loadingStatus => ({
  type: USER_LOGIN_LOADING,
  payload: loadingStatus
});

export const userLoginError = (error, message) => ({
  type: USER_LOGIN_ERROR,
  payload: error ? [...error] : [message]
});

export const clearLoginErrors = () => ({ type: CLEAR_LOGIN_ERRORS });

export const logOutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
  return {
    type: USER_LOGGED_OUT,
    payload: { isAuthenticated: false, userRole: 'guest' }
  };
};

export const loginUser = userInfo => async dispatch => {
  try {
    dispatch(userLoginLoading(true));

    const options = {
      method: 'POST',
      body: userInfo
    };

    const { data } = await Util.makeRequest('/auth/login', options);

    const userDetails = {
      token: data.token,
      role: decodeJwt(data.token).role
    };

    localStorage.setItem('user', data.token);

    if (decodeJwt(data.token).role === 'Attendant') localStorage.setItem('cart', '[]');

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { isAuthenticated: true, userRole: userDetails.role }
    });
  } catch (err) {
    const { error, message } = err.response.data;
    dispatch(userLoginError(error, message));
  }
};
