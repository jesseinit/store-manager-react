import {
  FETCHING_DASHBOARD_START,
  POPULATE_DASHBOARD_SUCCESS,
  POPULATE_SALES_SUCCESS,
  GET_SALES_NEXT_PAGE,
  GET_SALES_PREV_PAGE
} from '../../actions/salesActions/salesActions';

const initialState = {
  misc: {},
  salesMade: [],
  meta: {},
  isLoading: false
};

const salesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_DASHBOARD_START:
      return { ...state, isLoading: payload };
    case POPULATE_DASHBOARD_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case POPULATE_SALES_SUCCESS:
      return { ...state, ...payload, isLoading: false };
    case GET_SALES_NEXT_PAGE:
      return { ...state, ...payload };
    case GET_SALES_PREV_PAGE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default salesReducer;
