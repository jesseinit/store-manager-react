import React, { Component } from 'react';
import Modal from 'react-modal';
import ErrorToast from '../ErrorToast/ErrorToast';
import Spinner from '../Spinner/Spinner';

class DeleteModal extends Component {
  componentDidMount = () => {};

  render() {
    const { modalState, user, closeModal, modalErrors, modalLoading, deleteUser } = this.props;
    return (
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        shouldCloseOnEsc
        ariaHideApp={false}
        contentLabel="Delete Modal"
        className="modal"
      >
        <div className="form-body">
          <h3>{`Do you want to delete ${user.name} ?`}</h3>
          <span role="button" tabIndex={0} className="form__closeBtn" onKeyUp={() => {}} onClick={closeModal}>
            &times;
          </span>
          <section style={{ padding: '0 15px' }}>
            {modalErrors.length ? <ErrorToast errors={modalErrors} /> : null}
            <button
              disabled={modalLoading ? true : null}
              onClick={() => deleteUser(user, closeModal)}
              type="button"
              id="confirm-delete"
            >
              {modalLoading ? <Spinner /> : 'Yes'}
            </button>
            <button onClick={closeModal} type="button" id="cancel-action">
              No
            </button>
          </section>
        </div>
      </Modal>
    );
  }
}

export default DeleteModal;
