import Util from '../../utils';

export const REFRESH_CART = 'REFRESH_CART';
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER';

export const refreshCart = () => {
  return {
    type: REFRESH_CART,
    payload: JSON.parse(localStorage.getItem('cart'))
  };
};

export const checkoutOrder = (cartItems, cb) => async dispatch => {
  try {
    await Util.makeRequest('/sales', { method: 'POST', body: { products: cartItems } });
    localStorage.setItem('cart', '[]');
    cb();
    dispatch({
      type: REFRESH_CART,
      payload: JSON.parse(localStorage.getItem('cart'))
    });
  } catch (error) {}
};
