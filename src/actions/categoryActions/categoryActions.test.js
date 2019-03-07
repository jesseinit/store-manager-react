import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiInstance } from '../../utils/index';
import { getCategories, GET_CATEGORIES } from './categoryActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Category Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('should dispatch GET_CATEGORIES with the right payload', () => {
    mock.onGet('/category').reply(200, { data: [] });

    const expectedAction = [
      {
        type: GET_CATEGORIES,
        payload: { allCategories: [] }
      }
    ];

    store.dispatch(getCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch GET_CATEGORIES with the right payload', () => {
    mock.onGet('/category').reply(401, { data: [] });

    const expectedAction = [{ type: 'USER_LOGGED_OUT', payload: { isAuthenticated: false, userRole: 'guest' } }];

    store.dispatch(getCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
