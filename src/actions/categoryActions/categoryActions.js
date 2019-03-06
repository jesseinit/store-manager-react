import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => async dispatch => {
  try {
    // dispatch(loginLoading(true));

    const { data } = await Util.makeRequest('/category');

    dispatch({ type: GET_CATEGORIES, payload: { allCategories: data } });

    // dispatch(loginLoading(false));
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
