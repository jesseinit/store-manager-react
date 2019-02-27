import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../../utils/index';
import {
  CREATE_USERS_FAILURE,
  CREATE_USERS_SUCCESS,
  GET_USERS,
  CREATE_USERS_START,
  USERS_LOADING,
  getUsers,
  createUser,
  userLoading
} from './usersActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('User Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('should dispatch USERS_LOADING when fetching users', () => {
    const expectedAction = [
      {
        type: USERS_LOADING,
        payload: { isLoading: true }
      }
    ];
    store.dispatch(userLoading(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should dispatch USER_LOGGED_OUT for unauthenticated users', () => {
    const mockPayload = {
      data: {},
      message: 'Sample DB Message'
    };

    mock.onGet('/users/').reply(401, mockPayload);

    const expectedAction = [
      {
        type: USERS_LOADING,
        payload: { isLoading: true }
      },
      {
        type: 'USER_LOGGED_OUT',
        payload: { isAuthenticated: false, userRole: 'guest' }
      }
    ];

    store.dispatch(getUsers()).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch GET_USERS when admin gets action', () => {
    const mockPayload = {
      data: {},
      message: 'Sample DB Message'
    };

    mock.onGet('/users/').reply(200, mockPayload);

    const expectedAction = [
      {
        type: USERS_LOADING,
        payload: { isLoading: true }
      },
      {
        type: GET_USERS,
        payload: { users: mockPayload.data, actionMessage: mockPayload.message, isLoading: false }
      }
    ];

    store.dispatch(getUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch CREATE_USERS_SUCCESS when admin creates an account', () => {
    const mockPayload = {
      data: {}
    };
    const closeModalMock = (() => jest.fn())();
    const userDetails = {};

    mock.onPost('/auth/signup').reply(201, mockPayload);

    const expectedAction = [
      {
        type: CREATE_USERS_START,
        payload: true
      },
      {
        type: CREATE_USERS_SUCCESS,
        payload: mockPayload.data
      }
    ];

    store.dispatch(createUser(userDetails, closeModalMock)).then(() => {
      expect(closeModalMock).toBeCalled();
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when admin is unauthenticated but tries to creates an account', () => {
    const mockPayload = {
      data: {}
    };
    const closeModalMock = (() => jest.fn())();
    const userDetails = {};

    mock.onPost('/auth/signup').reply(401, mockPayload);

    const expectedAction = [
      {
        type: USERS_LOADING,
        payload: { isLoading: true }
      },
      {
        type: 'USER_LOGGED_OUT',
        payload: { isAuthenticated: false, userRole: 'guest' }
      }
    ];

    store.dispatch(createUser(userDetails)).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
