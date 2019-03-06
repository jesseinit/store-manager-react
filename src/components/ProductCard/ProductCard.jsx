import React from 'react';
import './ProductCard.scss';
import Util from '../../utils';

const ProductCard = ({ product }) => {
  // The guy that adds product to cart
  const addProductToCart = e => {};

  const inStock = product.product_qty ? 'in-stock' : 'out-stock';

  const cartBtn = product.product_qty ? (
    <button
      type="button"
      id="#add-to-cart"
      data-id={product.product_id}
      className="product__addCart"
      onClick={addProductToCart}
    >
      Add to Cart
    </button>
  ) : (
    <button type="button" disabled className="product__addCart">
      Out of Stock
    </button>
  );

  return (
    <div className={`product ${inStock}`}>
      <img className="product__image" src={product.product_image} alt="product_image" />
      <div className="product__details">
        <p className="product__name">{product.product_name}</p>
        <p className="product__price">
          <span className="currency">₦</span>
          {Util.formatPrice(product.product_price)}
        </p>
        <div className="product__stkInfo">
          <p className="product__cat">{product.category_name}</p>
          <p className="product__stock">{product.product_qty}</p>
        </div>
        <div className="amt">
          <input className="product__qty" type="number" defaultValue="1" min="1" max={product.product_qty} />
        </div>
        {cartBtn}
      </div>
    </div>
  );
};

export default ProductCard;
