import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../../assets/img/cart-icon.png';

const CartButton = ({ cart }) => {
  return (
    <Link to="/cart">
      <li className="cart">
        <img className="cart__image" src={cartIcon} alt="cartImage" />
        <span className="cart__count">{cart.cartItems.length || 0}</span>
      </li>
    </Link>
  );
};

export default CartButton;
