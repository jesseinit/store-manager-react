import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import cartIcon from '../../assets/img/cart-icon.png';

const CartButton = ({ cart }) => {
  return (
    <Router>
      <Link to="cart">
        <li className="cart">
          <img className="cart__image" src={cartIcon} alt="cartImage" />
          <span className="cart__count">{cart.cartItems.length || 0}</span>
        </li>
      </Link>
    </Router>
  );
};

export default CartButton;
