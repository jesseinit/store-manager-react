import salesReducer from './salesReducer';
import {
  FETCHING_DASHBOARD_START,
  POPULATE_DASHBOARD_SUCCESS,
  POPULATE_SALES_SUCCESS
} from '../../actions/salesActions/salesActions';

describe('Sales Reducer', () => {
  const initialState = {
    misc: {},
    salesMade: [],
    meta: {},
    isLoading: false
  };

  test('should return initial state', () => {
    expect(salesReducer(initialState, { type: 'DUMB_ACTION' })).toEqual(initialState);
  });

  test('should dispatch FETCHING_DASHBOARD_START with the right payload', () => {
    const expectePayload = {
      ...initialState,
      isLoading: true
    };
    expect(salesReducer(initialState, { type: FETCHING_DASHBOARD_START, payload: true })).toEqual(expectePayload);
  });

  test('should dispatch POPULATE_DASHBOARD_SUCCESS with the right payload', () => {
    const expectePayload = {
      ...initialState,
      isLoading: false
    };
    expect(salesReducer(initialState, { type: POPULATE_DASHBOARD_SUCCESS, payload: {} })).toEqual(expectePayload);
  });

  test('should dispatch POPULATE_SALES_SUCCESS with the right payload', () => {
    const expectePayload = {
      ...initialState,
      isLoading: false
    };
    expect(salesReducer(initialState, { type: POPULATE_SALES_SUCCESS, payload: {} })).toEqual(expectePayload);
  });
});
