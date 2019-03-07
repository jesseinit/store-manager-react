import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiInstance } from '../../utils/index';
import {
  getProductsAction,
  getProducts,
  goToNextPage,
  PRODUCTS_ACTION_START,
  GET_PRODUCTS,
  GET_PRODUCTS_NEXT_PAGE,
  GET_PRODUCTS_PREV_PAGE,
  CREATE_PRODUCTS_SUCCESS,
  PRODUCTS_ACTION_FAILURE,
  goToPrevPage,
  createProduct,
  clearModalErrors,
  CLEAR_MODAL_ERRORS
} from './productActions';
import { USER_LOGGED_OUT } from '../authActions/authActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Product Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  test('should dispatch PRODUCTS_ACTION_START with the right payload ', () => {
    const expectedAction = [
      {
        type: PRODUCTS_ACTION_START,
        payload: { isLoading: true }
      }
    ];

    store.dispatch(getProductsAction({ isLoading: true }));
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should dispatch CLEAR_MODAL_ERRORS with the right payload ', () => {
    const expectedAction = [{ type: CLEAR_MODAL_ERRORS }];

    store.dispatch(clearModalErrors());
    expect(store.getActions()).toEqual(expectedAction);
  });

  test('should dispatch GET_PRODUCTS with the right payload ', () => {
    const mockPayload = { data: [], meta: {}, message: '' };
    mock.onGet('/products').reply(200, mockPayload);

    const expectedAction = [
      { type: PRODUCTS_ACTION_START, payload: { isLoading: true } },
      {
        type: GET_PRODUCTS,
        payload: {
          productsList: mockPayload.data,
          meta: mockPayload.meta,
          isLoading: false,
          message: mockPayload.message
        }
      }
    ];

    store.dispatch(getProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when request is not authenticated', () => {
    const mockPayload = { data: [], meta: {}, message: '' };
    mock.onGet('/products').reply(401, mockPayload);

    const expectedAction = [
      { type: PRODUCTS_ACTION_START, payload: { isLoading: true } },
      {
        type: USER_LOGGED_OUT,
        payload: {
          isAuthenticated: false,
          userRole: 'guest'
        }
      }
    ];

    store.dispatch(getProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch GET_PRODUCTS_NEXT_PAGE with the right payload', () => {
    const mockPayload = { data: [], meta: {} };
    const nextPage = 1;

    mock.onGet(`/products?page=${nextPage}`).reply(200, mockPayload);

    const expectedAction = [
      {
        type: GET_PRODUCTS_NEXT_PAGE,
        payload: {
          productsList: mockPayload.data,
          meta: mockPayload.meta
        }
      }
    ];

    store.dispatch(goToNextPage(nextPage)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when request is not authenticated when GET_PRODUCTS_NEXT_PAGE is dispatched', () => {
    const mockPayload = { data: [], meta: {} };
    const nextPage = 1;

    mock.onGet(`/products?page=${nextPage}`).reply(401, mockPayload);

    const expectedAction = [
      {
        type: USER_LOGGED_OUT,
        payload: {
          isAuthenticated: false,
          userRole: 'guest'
        }
      }
    ];

    store.dispatch(goToNextPage(nextPage)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch GET_PRODUCTS_PREV_PAGE with the right payload', () => {
    const mockPayload = { data: [], meta: {} };
    const prevPage = 1;

    mock.onGet(`/products?page=${prevPage}`).reply(200, mockPayload);

    const expectedAction = [
      {
        type: GET_PRODUCTS_PREV_PAGE,
        payload: {
          productsList: mockPayload.data,
          meta: mockPayload.meta
        }
      }
    ];

    store.dispatch(goToPrevPage(prevPage)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should dispatch USER_LOGGED_OUT when request is not authenticated when GET_PRODUCTS_PREV_PAGE is dispatched', () => {
    const mockPayload = { data: [], meta: {} };
    const prevPage = 1;

    mock.onGet(`/products?page=${prevPage}`).reply(401, mockPayload);

    const expectedAction = [
      {
        type: USER_LOGGED_OUT,
        payload: {
          isAuthenticated: false,
          userRole: 'guest'
        }
      }
    ];

    store.dispatch(goToPrevPage(prevPage)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should disptach CREATE_PRODUCTS_SUCCESS with the right payload on success', () => {
    const mockPayload = { data: [], message: '' };
    mock.onPost('/products').reply(200, mockPayload);

    const expectedAction = [
      { type: PRODUCTS_ACTION_START, payload: { modalLoading: true } },
      {
        type: CREATE_PRODUCTS_SUCCESS,
        payload: {
          productsList: mockPayload.data,
          message: mockPayload.message
        }
      }
    ];

    store.dispatch(createProduct(new FormData(), jest.fn())).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should disptach CREATE_PRODUCTS_SUCCESS with the right payload on success', () => {
    const mockPayload = { message: 'Message from Server' };
    mock.onPost('/products').reply(500, mockPayload);

    const expectedAction = [
      { type: PRODUCTS_ACTION_START, payload: { modalLoading: true } },
      { type: PRODUCTS_ACTION_START, payload: { modalLoading: false } },
      { type: PRODUCTS_ACTION_FAILURE, payload: ['Message from Server'] }
    ];

    store.dispatch(createProduct(new FormData(), jest.fn())).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
