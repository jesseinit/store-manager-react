import React, { Component } from 'react';
import './ProductCard.scss';
import Util from '../../utils';

class ProductCard extends Component {
  addProductToCart = requestDetails => {
    const { refreshCart } = this.props;

    if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');

    const productEntry = {
      id: requestDetails.product.product_id,
      qty: Number(requestDetails.requestedQty),
      name: requestDetails.product.product_name,
      price: requestDetails.product.product_price,
      total: Number(requestDetails.requestedQty) * requestDetails.product.product_price
    };

    const cartItems = JSON.parse(localStorage.getItem('cart'));

    const thisProduct = cartItems.find(product => product.id === productEntry.id);

    if (!thisProduct) {
      cartItems.push(productEntry);
    } else {
      thisProduct.qty = productEntry.qty;
      thisProduct.total = Number(requestDetails.requestedQty) * requestDetails.product.product_price;
    }

    const updatedCart = JSON.stringify(cartItems);
    localStorage.setItem('cart', updatedCart);

    refreshCart();
  };

  render() {
    const { product } = this.props;
    return (
      <div className={`product ${product.product_qty ? 'in-stock' : 'out-stock'}`}>
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
            <input
              className="product__qty"
              type="number"
              ref={requestedQty => (this.requestedQty = requestedQty)}
              defaultValue="1"
              min="1"
              max={product.product_qty}
            />
          </div>
          {product.product_qty ? (
            <button
              type="button"
              id="#add-to-cart"
              data-id={product.product_id}
              className="product__addCart"
              onClick={() =>
                this.addProductToCart({
                  product,
                  requestedQty: this.requestedQty.value,
                  allowedQty: product.product_qty
                })
              }
            >
              Add to Cart
            </button>
          ) : (
            <button type="button" disabled className="product__addCart">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ProductCard;
