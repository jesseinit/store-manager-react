import authReducer from './authReducer';

import {
  CLEAR_LOGIN_ERRORS,
  USER_LOGGED_OUT,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS
} from '../../actions/authActions/authActions';

describe('Auth Reducer', () => {
  const initialAuthState = {
    isAuthenticated: false,
    roleId: '',
    loginErrors: [],
    isLoading: false
  };

  test('should return initial state', () => {
    expect(authReducer(initialAuthState, { type: 'DUMB_ACTION' })).toEqual(initialAuthState);
  });

  test('should update state with changes when CLEAR_LOGIN_ERRORS action is dispatched', () => {
    const action = { type: CLEAR_LOGIN_ERRORS };

    const expectedState = {
      ...initialAuthState
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  test('should update state with changes when USER_LOGGED_OUT action is dispatched', () => {
    const action = { type: USER_LOGGED_OUT, payload: { isAuthenticated: false, userRole: 'guest' } };

    const expectedState = {
      ...initialAuthState,
      ...action.payload
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
  test('should update state with changes when USER_LOGIN_ERROR action is dispatched', () => {
    const action = { type: USER_LOGIN_ERROR, payload: ['Error from Database'] };

    const expectedState = {
      ...initialAuthState,
      loginErrors: [...action.payload]
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
  test('should update state with changes when USER_LOGIN_LOADING action is dispatched', () => {
    const action = { type: USER_LOGIN_LOADING, payload: true };

    const expectedState = {
      ...initialAuthState,
      isLoading: action.payload
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
  test('should update state with changes when USER_LOGIN_SUCCESS action is dispatched', () => {
    const action = { type: USER_LOGIN_SUCCESS, payload: { isAuthenticated: true, userRole: 'Admin' } };

    const expectedState = {
      ...initialAuthState,
      ...action.payload
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
});
