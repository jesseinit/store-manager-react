import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const FETCHING_DASHBOARD_START = 'FETCHING_DASHBOARD_DATA';
export const POPULATE_DASHBOARD_SUCCESS = 'POPULATE_DASHBOARD_SUCCESS';
export const POPULATE_SALES_SUCCESS = 'POPULATE_SALES_SUCCESS';

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

    const { data } = await Util.makeRequest(salesEndPointUri);

    dispatch({
      type: POPULATE_SALES_SUCCESS,
      payload: { salesMade: data }
    });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
