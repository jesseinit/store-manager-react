import {
  GET_USERS,
  CREATE_USERS_SUCCESS,
  UPDATE_USERS_SUCCESS,
  DELETE_USERS_SUCCESS,
  USERS_LOADING,
  CREATE_USERS_FAILURE,
  USER_ACTION_START,
  CLEAR_MODAL_ERRORS
} from '../../actions/usersActions/usersActions';

const initalState = {
  users: [],
  actionMessage: '',
  isLoading: false,
  modalLoading: false,
  modalErrors: []
};

const userReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case USERS_LOADING:
      return { ...state, ...payload };
    case USER_ACTION_START:
      return { ...state, modalLoading: payload };
    case UPDATE_USERS_SUCCESS:
      return { ...state, ...payload };
    case DELETE_USERS_SUCCESS:
      return { ...state, ...payload };
    case CLEAR_MODAL_ERRORS:
      return { ...state, modalErrors: [] };
    case GET_USERS:
      return { ...state, ...payload };
    case CREATE_USERS_FAILURE:
      return { ...state, modalErrors: [...payload], modalLoading: false };
    case CREATE_USERS_SUCCESS:
      return { ...state, users: [...state.users, payload.data], actionMessage: payload.message, modalLoading: false };
    default:
      return state;
  }
};
export default userReducer;
