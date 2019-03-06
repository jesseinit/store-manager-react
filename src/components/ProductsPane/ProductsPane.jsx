import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as productActions from '../../actions/productActions/productActions';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import Util from '../../utils';

// TODO: Update "productsList" - across board - to "entity" to enable reuse of pagination component

class ProductsPane extends Component {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const {
      products,
      products: { productsList, isLoading }
    } = this.props;

    if (isLoading) {
      return <Loading title="Fectching Products" />;
    }
    return (
      <section className="main">
        <section className="sales">
          <button type="button" className="btn btn--orange" id="create-product">
            Create Product
          </button>
          <section className="filters">
            <form id="filter-name" className="filters__form">
              <fieldset>
                <legend>Filter By Product Name</legend>
                <input id="search-name" type="text" placeholder="Search Product" />
                <input type="submit" value="Retrieve Records" />
              </fieldset>
            </form>
            <form id="filter-rows" className="filters__form">
              <fieldset>
                <legend>Filter Rows</legend>
                <select id="filter-pref">
                  <option value="10">10 Records</option>
                  <option value="50">50 Records</option>
                  <option value="100">100 Records</option>
                </select>
                <input type="submit" value="Retrieve Records" />
              </fieldset>
            </form>
            <form id="filter-qty" className="filters__form">
              <fieldset>
                <legend>Filter Remaining Quantity</legend>
                <select id="qty-pref">
                  <option value="10">Less than 10</option>
                  <option value="20">Less than 20</option>
                  <option value="30">Less than 30</option>
                </select>
                <input type="submit" value="Retrieve Records" />
              </fieldset>
            </form>
            <button type="button" id="clear-product-filters" className="filters__clear">
              Clear Filters
            </button>
          </section>
          <div className="table-wrapper">
            <table id="products-table" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsList.length ? (
                  productsList.map(product => {
                    return (
                      <tr key={product.product_id}>
                        <td>{product.product_id}</td>
                        <td>{product.product_name}</td>
                        <td>{Util.formatPrice(product.product_price)}</td>
                        <td>
                          {product.product_qty ? (
                            product.product_qty
                          ) : (
                            <span style={{ background: 'antiquewhite', padding: '0 2px' }}>Out of stock</span>
                          )}
                        </td>
                        <td data-id={product.product_id}>
                          <button type="button" className="blue">
                            Update
                          </button>
                          <button type="button" className="red">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">You have not created products yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <Pagination entity={products} allProps={this.props} />
      </section>
    );
  }
}

ProductsPane.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => ({ products: state.products });

const mapActionsToProps = {
  getProducts: productActions.getProducts,
  goToNextPage: productActions.goToNextPage,
  goToPrevPage: productActions.goToPrevPage
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductsPane);
