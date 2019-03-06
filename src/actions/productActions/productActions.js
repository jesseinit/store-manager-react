import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const PRODUCTS_ACTION_START = 'PRODUCTS_ACTION_START';
export const GET_PRODUCTS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_NEXT_PAGE = 'GET_PRODUCTS_NEXT_PAGE';
export const GET_PRODUCTS_PREV_PAGE = 'GET_PRODUCTS_PREV_PAGE';

export const getProductsAction = () => ({ type: PRODUCTS_ACTION_START });

export const getProducts = () => async dispatch => {
  try {
    dispatch(getProductsAction());

    const { data, meta } = await Util.makeRequest('/products');

    dispatch({ type: GET_PRODUCTS, payload: { productsList: data, meta, isLoading: false } });
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
    console.log(error);
  }
};

export const goToPrevPage = prevPage => async dispatch => {
  try {
    const { data, meta } = await Util.makeRequest(`/products?page=${prevPage}`);
    dispatch({ type: GET_PRODUCTS_PREV_PAGE, payload: { productsList: data, meta } });
  } catch (error) {
    console.log(error);
  }
};
