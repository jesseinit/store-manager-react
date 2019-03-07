import {
  PRODUCTS_ACTION_START,
  GET_PRODUCTS,
  GET_PRODUCTS_NEXT_PAGE,
  GET_PRODUCTS_PREV_PAGE,
  CLEAR_MODAL_ERRORS,
  PRODUCTS_ACTION_FAILURE,
  CREATE_PRODUCTS_SUCCESS
} from '../../actions/productActions/productActions';

const initalState = {
  productsList: [],
  meta: {},
  isLoading: false,
  modalErrors: [],
  modalLoading: false,
  message: ''
};

const productsReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTION_START:
      return { ...state, ...payload };
    case GET_PRODUCTS:
      return { ...state, ...payload };
    case CREATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsList: [payload.productsList, ...state.productsList],
        message: payload.message,
        modalLoading: false
      };
    case GET_PRODUCTS_NEXT_PAGE:
      return { ...state, ...payload };
    case GET_PRODUCTS_PREV_PAGE:
      return { ...state, ...payload };
    case CLEAR_MODAL_ERRORS:
      return { ...state, modalErrors: [] };
    case PRODUCTS_ACTION_FAILURE:
      return { ...state, modalErrors: [...payload], modalLoading: false };
    default:
      return state;
  }
};

export default productsReducer;
