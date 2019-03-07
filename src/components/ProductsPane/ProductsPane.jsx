import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as productActions from '../../actions/productActions/productActions';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import Util from '../../utils';
import CreateProductModal from '../Modals/CreateProductModal';
import * as categoryActions from '../../actions/categoryActions/categoryActions';
import ToastContainer from '../Toasts/ToastContainer';

class ProductsPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: {},
      setCreateModalOpen: false,
      updateModalIsOpen: false,
      deleteModalIsOpen: false
    };
  }

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  openUpdateModal = userData => {
    this.setState({ updateModalIsOpen: true, userData });
  };

  openDeleteModal = userData => {
    this.setState({ deleteModalIsOpen: true, userData });
  };

  openModal = () => {
    this.setState({ setCreateModalOpen: true });
  };

  closeModal = () => {
    const {
      clearModalErrors,
      products: { modalErrors }
    } = this.props;
    this.setState({ setCreateModalOpen: false, updateModalIsOpen: false, deleteModalIsOpen: false });
    if (modalErrors.length) clearModalErrors();
  };

  render() {
    const {
      products,
      categories,
      products: { productsList, isLoading, modalErrors, modalLoading, message: actionMessage },
      createProduct,
      clearModalErrors,
      getCategories
    } = this.props;

    const { setCreateModalOpen } = this.state;

    if (isLoading) {
      return <Loading title="Fectching Products" />;
    }
    return (
      <section className="main">
        <section className="sales">
          <button type="button" className="btn btn--gradient" id="create-product" onClick={this.openModal}>
            Create Product
          </button>

          <CreateProductModal
            modalOpenState={setCreateModalOpen}
            clearModalErrors={clearModalErrors}
            closeModal={this.closeModal}
            modalErrors={modalErrors}
            modalLoading={modalLoading}
            createProduct={createProduct}
            getCategories={getCategories}
            categories={categories}
          />

          <ToastContainer message={actionMessage} />

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
        {productsList.length ? <Pagination entity={products} allProps={this.props} /> : null}
        {/* <Pagination entity={products} allProps={this.props} /> */}
      </section>
    );
  }
}

ProductsPane.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  clearModalErrors: PropTypes.func.isRequired,
  products: PropTypes.oneOfType([PropTypes.object]).isRequired,
  categories: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => ({ products: state.products, categories: state.categories });

const mapActionsToProps = {
  getProducts: productActions.getProducts,
  goToNextPage: productActions.goToNextPage,
  goToPrevPage: productActions.goToPrevPage,
  createProduct: productActions.createProduct,
  clearModalErrors: productActions.clearModalErrors,
  getCategories: categoryActions.getCategories
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ProductsPane);
