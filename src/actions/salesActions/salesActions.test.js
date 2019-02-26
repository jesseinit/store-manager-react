import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../../utils/index';
import {
  FETCHING_DASHBOARD_START,
  POPULATE_DASHBOARD_SUCCESS,
  POPULATE_SALES_SUCCESS,
  populateDashboard,
  populateSales
} from './salesActions';
import { logOutUser, USER_LOGGED_OUT } from '../authActions/authActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Sales Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('should dispatch POPULATE_DASHBOARD_SUCCESS on successfull login', () => {
    const mockPayload = {
      data: {
        misc: {}
      }
    };

    mock.onGet('/sales/?misc=true').reply(200, mockPayload);

    const expectedAction = [
      {
        type: FETCHING_DASHBOARD_START,
        payload: true
      },
      {
        type: POPULATE_DASHBOARD_SUCCESS,
        payload: mockPayload.data.misc
      }
    ];

    store.dispatch(populateDashboard()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when the user is not authenticated but tries to view dashboard', () => {
    const mockPayload = {
      data: {
        misc: {}
      }
    };

    mock.onGet('/sales/attendants/?misc=true').reply(401, mockPayload);

    const expectedAction = [
      {
        type: FETCHING_DASHBOARD_START,
        payload: true
      },
      {
        type: USER_LOGGED_OUT,
        payload: { isAuthenticated: false, userRole: 'guest' }
      }
    ];

    store.dispatch(populateDashboard('Attendant')).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch POPULATE_SALES_SUCCESS with the right payload', () => {
    const mockPayload = {
      data: {}
    };

    mock.onGet('/sales').reply(200, mockPayload);

    const expectedAction = [
      {
        type: FETCHING_DASHBOARD_START,
        payload: true
      },
      {
        type: POPULATE_SALES_SUCCESS,
        payload: { salesMade: mockPayload.data }
      }
    ];

    store.dispatch(populateSales()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when the user is not authenticated but tries to view dashboard', () => {
    const mockPayload = {
      data: {
        misc: {}
      }
    };

    mock.onGet('/sales/attendants').reply(401, mockPayload);

    const expectedAction = [
      {
        type: FETCHING_DASHBOARD_START,
        payload: true
      },
      {
        type: USER_LOGGED_OUT,
        payload: { isAuthenticated: false, userRole: 'guest' }
      }
    ];

    store.dispatch(populateSales('Attendant')).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
