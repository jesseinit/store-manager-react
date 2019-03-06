import {
  PRODUCTS_ACTION_START,
  GET_PRODUCTS,
  GET_PRODUCTS_NEXT_PAGE,
  GET_PRODUCTS_PREV_PAGE
} from '../../actions/productActions/productActions';

const initalState = {
  productsList: [],
  meta: {},
  isLoading: false
};

const productsReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTION_START:
      return { ...state, isLoading: true };
    case GET_PRODUCTS:
      return { ...state, ...payload };
    case GET_PRODUCTS_NEXT_PAGE:
      return { ...state, ...payload };
    case GET_PRODUCTS_PREV_PAGE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default productsReducer;
