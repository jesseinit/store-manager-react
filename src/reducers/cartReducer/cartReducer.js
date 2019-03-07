import { REFRESH_CART } from '../../actions/cartActions/cartActions';

if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart'))
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REFRESH_CART:
      return { ...state, cartItems: [...payload] };

    default:
      return state;
  }
};

export default cartReducer;
