import React, { Component } from 'react';
import Modal from 'react-modal';
import Spinner from '../Spinner/Spinner';
import ErrorToast from '../ErrorToast/ErrorToast';

class CreateProductModal extends Component {
  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories();
  };

  handleProductCreation = e => {
    e.preventDefault();

    const { modalErrors, createProduct, clearModalErrors, closeModal } = this.props;

    if (modalErrors.length) clearModalErrors();

    const productImage = this.productImage.files[0];
    const productName = this.productName.value;
    const productPrice = this.productPrice.value.replace(/,/g, '');
    const productQty = this.productQty.value;
    const productCategory = this.productCategory.value;

    const formData = new FormData();
    formData.append('imageUrl', productImage);
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('qty', productQty);
    formData.append('categoryid', productCategory);

    createProduct(formData, () => closeModal());
  };

  render() {
    const {
      modalOpenState,
      closeModal,
      modalErrors,
      modalLoading,
      categories: { allCategories }
    } = this.props;

    return (
      <Modal
        isOpen={modalOpenState}
        onRequestClose={closeModal}
        shouldCloseOnEsc
        ariaHideApp={false}
        contentLabel="New Product"
        className="modal"
      >
        <div className="form-body">
          <h3>Create Product</h3>
          <span role="link" tabIndex={0} onKeyDown={() => {}} className="form__closeBtn" onClick={closeModal}>
            &times;
          </span>

          <form id="create-new-product" encType="multipart/form-data" onSubmit={this.handleProductCreation}>
            {modalErrors.length ? <ErrorToast errors={modalErrors} /> : null}
            <div className="input-group">
              <label htmlFor="product-image">
                Product Image
                <input
                  ref={productImage => (this.productImage = productImage)}
                  type="file"
                  id="product-image"
                  accept=".jpg"
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="product-name">
                Product Name
                <input
                  ref={productName => (this.productName = productName)}
                  id="product-name"
                  type="text"
                  placeholder="Product Name"
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="product-price">
                Product Price
                <input
                  ref={productPrice => (this.productPrice = productPrice)}
                  id="product-price"
                  type="text"
                  placeholder="Product Price"
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="product-qty">
                Product Qty
                <input
                  ref={productQty => (this.productQty = productQty)}
                  id="product-qty"
                  type="text"
                  placeholder="Product Quantity"
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="product-cat">
                Product Category:
                <select ref={productCategory => (this.productCategory = productCategory)} id="product-cat" required>
                  <option defaultValue="All">Select Category</option>
                  {allCategories.map(category => {
                    return (
                      <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="input-group">
              <button type="submit" disabled={modalLoading ? true : null} className="btn btn--gradient full-width">
                {modalLoading ? <Spinner /> : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default CreateProductModal;
