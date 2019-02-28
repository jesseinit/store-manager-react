import React, { Component } from 'react';
import Modal from 'react-modal';
import Spinner from '../Spinner/Spinner';
import ErrorToast from '../ErrorToast/ErrorToast';

class CreateUserModal extends Component {
  handleUserCreation = e => {
    e.preventDefault();

    const {
      users: { modalErrors },
      createUser,
      clearModalErrors,
      closeModal
    } = this.props;

    if (modalErrors.length) clearModalErrors();

    const name = this.staffName.value;
    const email = this.staffEmail.value;
    const password = this.staffPassword.value;
    const role = this.staffRole.value;
    createUser(
      {
        name,
        email,
        password,
        role
      },
      () => closeModal()
    );
  };

  render() {
    const { modalOpenState, closeModal, modalErrors, modalLoading } = this.props;
    return (
      <Modal
        isOpen={modalOpenState}
        onRequestClose={closeModal}
        shouldCloseOnEsc
        ariaHideApp={false}
        contentLabel="Example Modal"
        className="modal"
      >
        <div className="form-body">
          <h3>Create New User</h3>
          <span role="link" tabIndex={0} onKeyDown={() => {}} className="form__closeBtn" onClick={closeModal}>
            &times;
          </span>
          <form id="create-user-form" onSubmit={this.handleUserCreation}>
            {modalErrors.length ? <ErrorToast errors={modalErrors} /> : null}
            <div className="input-group">
              <label htmlFor="staff-name">
                Employee Name
                <input type="text" id="staff-name" required ref={staffName => (this.staffName = staffName)} />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="staff-email">
                Employee Email:
                <input type="email" id="staff-email" required ref={staffEmail => (this.staffEmail = staffEmail)} />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="staff-password">
                Employee Password:
                <input
                  type="password"
                  id="staff-password"
                  required
                  ref={staffPassword => (this.staffPassword = staffPassword)}
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="staff-role">
                Select Role:
                <select id="staff-role" ref={staffRole => (this.staffRole = staffRole)}>
                  <option value="Attendant">Attendant</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>
            </div>
            <div className="input-group">
              <button type="submit" disabled={modalLoading ? true : null} className="btn btn--gradient full-width">
                {modalLoading ? <Spinner /> : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default CreateUserModal;
