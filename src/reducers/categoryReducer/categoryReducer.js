import { GET_CATEGORIES } from '../../actions/categoryActions/categoryActions';

const initialState = {
  allCategories: []
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      return payload;
    default:
      return state;
  }
};

export default categoryReducer;
