import Util from '../../utils';

export const REFRESH_CART = 'REFRESH_CART';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const PROCESSING_ORDER = 'PROCESSING_ORDER';

export const refreshCart = () => {
  return {
    type: REFRESH_CART,
    payload: { cartItems: JSON.parse(localStorage.getItem('cart')) }
  };
};

export const checkoutOrder = (cartItems, cb) => async dispatch => {
  try {
    dispatch({ type: PROCESSING_ORDER, payload: true });
    await Util.makeRequest('/sales', { method: 'POST', body: { products: cartItems } });
    localStorage.setItem('cart', '[]');
    cb();
    dispatch({
      type: REFRESH_CART,
      payload: { cartItems: JSON.parse(localStorage.getItem('cart')), processingCheckout: false }
    });
  } catch (error) {
    const { response } = error;
    console.log(response);
    dispatch({
      type: CHECKOUT_FAILURE,
      payload: response.data.error ? [...response.data.error] : [response.data.message]
    });
  }
};
