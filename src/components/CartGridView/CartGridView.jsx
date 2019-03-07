import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartActions/cartActions';
import Util from '../../utils';

class CartGridView extends Component {
  state = {
    isCheckoutCompleted: false
  };

  removeItem = itemId => {
    const { refreshCart } = this.props;
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const thisProduct = cartItems.find(product => product.id === itemId);
    if (thisProduct) {
      cartItems.splice(cartItems.indexOf(thisProduct), 1);
      const updatedCart = JSON.stringify(cartItems);
      localStorage.setItem('cart', updatedCart);
      refreshCart();
    }
  };

  completeChekcout = () => {
    const { checkoutOrder, refreshCart } = this.props;
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (!cartItems.length) {
      return refreshCart();
    }
    return checkoutOrder(cartItems, () => this.setState({ isCheckoutCompleted: true }));
  };

  render() {
    const {
      cart: { cartItems }
    } = this.props;

    const { isCheckoutCompleted } = this.state;

    return (
      <section className="main">
        {isCheckoutCompleted ? (
          <div className="checkout-success">
            <h3>Checkout Completed Succesfully</h3>
          </div>
        ) : !cartItems.length ? (
          <div className="no-result">
            <h3>Cart is currently Empty</h3>
          </div>
        ) : (
          <>
            <div className="sales__meta">
              <h3 className="header cart__header">Cart</h3>
            </div>
            <div className="table-wrapper no-flow">
              <table id="cart-table" className="table">
                <thead>
                  <tr>
                    <th />
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th className="total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(cartItem => {
                    return (
                      <tr key={cartItem.id}>
                        <td>
                          <span
                            role="button"
                            tabIndex={0}
                            onKeyDown={() => {}}
                            onClick={() => this.removeItem(cartItem.id)}
                            className="remove"
                          >
                            -
                          </span>
                        </td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.qty}</td>
                        <td>{Util.formatPrice(cartItem.price)}</td>
                        <td className="total">{Util.formatPrice(cartItem.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th />
                    <th className="total">
                      <span>
                        {`Total: ${Util.formatPrice(
                          cartItems.map(item => item.total).reduce((acc, curr) => acc + curr, 0)
                        )}`}
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <button onClick={this.completeChekcout} type="button" id="complete-order" className="btn btn--gradient">
                Complete Order
              </button>
            </div>
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { refreshCart: cartActions.refreshCart, checkoutOrder: cartActions.checkoutOrder }
)(CartGridView);
