import React, { Component } from 'react';
import Modal from 'react-modal';
import ErrorToast from '../ErrorToast/ErrorToast';
import Spinner from '../Spinner/Spinner';

class UpdateUserModal extends Component {
  componentDidMount = () => {};

  handleUserUpdate = e => {
    e.preventDefault();
    const { updateUser, clearModalErrors, modalErrors, closeModal } = this.props;

    if (modalErrors.length) clearModalErrors();

    const userInfo = {
      id: e.target.dataset.id,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value
    };

    if (!userInfo.password) delete userInfo.password;
    if (userInfo.role === 'Owner') delete userInfo.role;

    updateUser(userInfo, closeModal);
  };

  render() {
    const { modalState, user, closeModal, modalErrors, modalLoading } = this.props;
    return (
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        shouldCloseOnEsc
        ariaHideApp={false}
        contentLabel="Example Modal"
        className="modal"
      >
        <div className="form-body">
          <h3>Update User Infomation</h3>
          <span role="button" tabIndex={0} className="form__closeBtn" onKeyUp={() => {}} onClick={closeModal}>
            &times;
          </span>
          <form id="update-user-form" data-id={user.id} onSubmit={this.handleUserUpdate}>
            {modalErrors.length ? <ErrorToast errors={modalErrors} /> : null}
            <div className="input-group">
              <label htmlFor="update-name">
                Employee Name
                <input
                  ref={name => (this.name = name)}
                  type="text"
                  id="update-name"
                  placeholder="Employee Name"
                  defaultValue={user.name}
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="update-email">
                Employee Email
                <input ref={email => (this.email = email)} id="update-email" disabled defaultValue={user.email} />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="update-password">
                Employee Password
                <input
                  ref={password => (this.password = password)}
                  type="password"
                  id="update-password"
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="update-role">
                Employee Role
                <select ref={role => (this.role = role)} id="update-role">
                  {user.role === 'Owner' ? (
                    <option defaultValue={user.role}>{user.role}</option>
                  ) : user.role === 'Admin' ? (
                    <>
                      <option defaultValue={user.role}>{user.role}</option>
                      <option value="Attendant">Attendant</option>
                    </>
                  ) : (
                    <>
                      <option defaultValue={user.role}>{user.role}</option>
                      <option value="Admin">Admin</option>
                    </>
                  )}
                </select>
              </label>
            </div>
            <div className="input-group">
              <button type="submit" disabled={modalLoading ? true : null} className="btn btn--gradient full-width">
                {modalLoading ? <Spinner /> : 'Update User'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default UpdateUserModal;
