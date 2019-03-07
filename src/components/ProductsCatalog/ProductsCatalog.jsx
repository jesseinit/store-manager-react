import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import * as productActions from '../../actions/productActions/productActions';
import * as categoryActions from '../../actions/categoryActions/categoryActions';
import * as cartActions from '../../actions/cartActions/cartActions';

import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';

class ProductsCatalog extends Component {
  componentDidMount() {
    const { getCategories, getProducts } = this.props;
    getCategories();
    getProducts();
  }

  render() {
    const {
      products,
      cart,
      products: { productsList, isLoading },
      categories: { allCategories },
      refreshCart
    } = this.props;
    return (
      <section className="main">
        <section className="search">
          <form id="search-form" className="search__form">
            <input type="text" autoFocus id="product-name" className="search__input" placeholder="Enter product name" />
            <select id="product-cat" className="search__catergory">
              <option value="All">All</option>
              {allCategories.map(category => {
                return (
                  <option key={category.category_id} value={category.category_name}>
                    {category.category_name}
                  </option>
                );
              })}
            </select>
            <input type="submit" className="search__submit" value="Search" />
          </form>
        </section>
        {isLoading ? (
          <Loading title="Fectching Products" />
        ) : (
          <>
            <section className="products" style={!productsList.length ? { display: 'block' } : null}>
              {productsList.length ? (
                productsList.map(product => {
                  return (
                    <ProductCard key={product.product_id} product={product} refreshCart={refreshCart} cart={cart} />
                  );
                })
              ) : (
                <div className="no-result">
                  <h3>The products catalog is currently empty</h3>
                </div>
              )}
            </section>
            {productsList.length ? <Pagination entity={products} allProps={this.props} /> : null}
          </>
        )}
      </section>
    );
  }
}

ProductsCatalog.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  refreshCart: PropTypes.func.isRequired,
  products: PropTypes.oneOfType([PropTypes.object]).isRequired,
  categories: PropTypes.oneOfType([PropTypes.object]).isRequired,
  cart: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  categories: state.categories,
  cart: state.cart
});

const mapActionsToProps = {
  getProducts: productActions.getProducts,
  getCategories: categoryActions.getCategories,
  goToNextPage: productActions.goToNextPage,
  goToPrevPage: productActions.goToPrevPage,
  refreshCart: cartActions.refreshCart
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductsCatalog);
