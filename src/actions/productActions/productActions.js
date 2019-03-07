import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const PRODUCTS_ACTION_START = 'PRODUCTS_ACTION_START';
export const PRODUCTS_ACTION_FAILURE = 'PRODUCTS_ACTION_FAILURE';
export const CLEAR_MODAL_ERRORS = 'CLEAR_MODAL_ERRORS';
export const GET_PRODUCTS = 'GET_PRODUCTS_SUCCESS';
export const CREATE_PRODUCTS_SUCCESS = 'CREATE_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_NEXT_PAGE = 'GET_PRODUCTS_NEXT_PAGE';
export const GET_PRODUCTS_PREV_PAGE = 'GET_PRODUCTS_PREV_PAGE';

export const getProductsAction = payload => ({ type: PRODUCTS_ACTION_START, payload });

export const handleProductActionFailure = response => ({
  type: PRODUCTS_ACTION_FAILURE,
  payload: response.data.error ? [...response.data.error] : [response.data.message]
});

export const getProducts = () => async dispatch => {
  try {
    dispatch(getProductsAction({ isLoading: true }));

    const { data, meta, message } = await Util.makeRequest('/products');

    dispatch({ type: GET_PRODUCTS, payload: { productsList: data, meta, isLoading: false, message } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const goToNextPage = nextPage => async dispatch => {
  try {
    const { data, meta } = await Util.makeRequest(`/products?page=${nextPage}`);
    dispatch({ type: GET_PRODUCTS_NEXT_PAGE, payload: { productsList: data, meta } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const goToPrevPage = prevPage => async dispatch => {
  try {
    const { data, meta } = await Util.makeRequest(`/products?page=${prevPage}`);
    dispatch({ type: GET_PRODUCTS_PREV_PAGE, payload: { productsList: data, meta } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const createProduct = (productInfo, closeModal) => async dispatch => {
  try {
    dispatch(getProductsAction({ modalLoading: true }));
    const { data, message } = await Util.makeRequest('/products', { method: 'POST', body: productInfo });
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: { productsList: data, message } });
    return closeModal();
  } catch (error) {
    const { response } = error;
    dispatch(getProductsAction({ modalLoading: false }));
    if (response.status === 401) return dispatch(logOutUser());
    return dispatch(handleProductActionFailure(response));
  }
};

export const clearModalErrors = () => ({ type: CLEAR_MODAL_ERRORS });
