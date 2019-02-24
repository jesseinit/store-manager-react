import React from 'react';
import cartIcon from '../../assets/img/cart-icon.png';

const CartButton = () => {
  return (
    <li className="cart">
      <a href="./cart">
        <img className="cart__image" src={cartIcon} alt="cartImage" />
        <span className="cart__count">0</span>
      </a>
    </li>
  );
};

export default CartButton;
