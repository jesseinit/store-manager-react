import { REFRESH_CART, PROCESSING_ORDER, CHECKOUT_FAILURE } from '../../actions/cartActions/cartActions';

if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')),
  processingCheckout: false,
  cartErrors: []
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REFRESH_CART:
      return { ...state, ...payload };
    case CHECKOUT_FAILURE:
      return { ...state, cartErrors: [...payload], processingCheckout: false };
    case PROCESSING_ORDER:
      return { ...state, processingCheckout: payload };
    default:
      return state;
  }
};

export default cartReducer;
