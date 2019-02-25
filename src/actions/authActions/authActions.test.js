import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../../utils/index';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOADING,
  USER_LOGIN_ERROR,
  USER_LOGGED_OUT,
  CLEAR_LOGIN_ERRORS,
  loginUser,
  userLoginError,
  logOutUser,
  clearLoginErrors
} from './authActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Auth Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('should dispatch USER_LOGIN_SUCCESS on successfull login', () => {
    const mockPayload = {
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvd25lckBzdG9yZW1hbmFnZXIuY29tIiwibmFtZSI6IlN0b3JlIE93bmVyIiwicm9sZSI6Ik93bmVyIiwiaWF0IjoxNTUxMTA5MzI0LCJleHAiOjE1NTExOTU3MjR9.M7PLWETMVhTsDc-OM0Lizc-7Q_bAwBI8NjvYnxI07kY',
        role: 'Attendant'
      }
    };

    mock.onPost('/auth/login').reply(201, mockPayload);

    const userInfo = {
      email: 'jesse@email.com',
      password: 'mypassword'
    };

    const expectedAction = [
      {
        type: USER_LOGIN_LOADING,
        payload: true
      },
      {
        type: USER_LOGIN_SUCCESS,
        payload: { isAuthenticated: true, userRole: 'Attendant' }
      }
    ];

    store.dispatch(loginUser(userInfo)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGIN_ERROR on failed login', () => {
    const mockPayload = {
      data: {
        error: ['Failed Login'],
        message: null
      }
    };

    mock.onPost('/auth/login').reply(500, mockPayload);

    const userInfo = {
      email: 'jesse@email.com',
      password: 'mypassword'
    };

    const expectedAction = [
      {
        type: USER_LOGIN_LOADING,
        payload: true
      },
      {
        type: USER_LOGIN_ERROR,
        payload: [...mockPayload.data.error]
      }
    ];

    store.dispatch(loginUser(userInfo)).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('USER_LOGIN_ERROR should return the right payload ', () => {
    const expectedAction = [
      {
        type: USER_LOGIN_ERROR,
        payload: ['Error']
      }
    ];

    store.dispatch(userLoginError(['Error']));

    expect(store.getActions()).toEqual(expectedAction);
  });

  test('USER_LOGGED_OUT should return the right payload', () => {
    const expectedAction = [
      {
        type: USER_LOGGED_OUT,
        payload: { isAuthenticated: false, userRole: 'guest' }
      }
    ];

    store.dispatch(logOutUser());

    expect(store.getActions()).toEqual(expectedAction);
  });

  test('CLEAR_LOGIN_ERRORS should return the right payload', () => {
    const expectedAction = [
      {
        type: CLEAR_LOGIN_ERRORS
      }
    ];

    store.dispatch(clearLoginErrors());

    expect(store.getActions()).toEqual(expectedAction);
  });
});
