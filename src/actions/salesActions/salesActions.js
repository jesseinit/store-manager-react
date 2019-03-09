import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const FETCHING_DASHBOARD_START = 'FETCHING_DASHBOARD_DATA';
export const POPULATE_DASHBOARD_SUCCESS = 'POPULATE_DASHBOARD_SUCCESS';
export const POPULATE_SALES_SUCCESS = 'POPULATE_SALES_SUCCESS';
export const GET_SALES_NEXT_PAGE = 'GET_SALES_NEXT_PAGE';
export const GET_SALES_PREV_PAGE = 'GET_SALES_PREV_PAGE';

export const populateDashboard = userRole => async dispatch => {
  try {
    dispatch({ type: FETCHING_DASHBOARD_START, payload: true });
    const salesEndPointUri = userRole === 'Attendant' ? '/sales/attendants/?misc=true' : '/sales/?misc=true';

    const { misc } = await Util.makeRequest(salesEndPointUri);

    dispatch({
      type: POPULATE_DASHBOARD_SUCCESS,
      payload: { misc }
    });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const populateSales = userRole => async dispatch => {
  try {
    dispatch({ type: FETCHING_DASHBOARD_START, payload: true });

    const salesEndPointUri = userRole === 'Attendant' ? '/sales/attendants' : '/sales';

    const { data, meta } = await Util.makeRequest(salesEndPointUri);

    dispatch({
      type: POPULATE_SALES_SUCCESS,
      payload: { salesMade: data, meta }
    });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const goToNextPage = nextPage => async dispatch => {
  try {
    const { data, meta } = await Util.makeRequest(`/sales?page=${nextPage}`);
    dispatch({ type: GET_SALES_NEXT_PAGE, payload: { salesMade: data, meta } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const goToPrevPage = prevPage => async dispatch => {
  try {
    const { data, meta } = await Util.makeRequest(`/sales?page=${prevPage}`);
    dispatch({ type: GET_SALES_PREV_PAGE, payload: { salesMade: data, meta } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
