import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions/usersActions';
import Loading from '../Loading/Loading';
import Spinner from '../Spinner/Spinner';
import ErrorToast from '../ErrorToast/ErrorToast';

export class AccountContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserCreation = this.handleUserCreation.bind(this);
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    const { clearModalErrors } = this.props;
    this.setState({ modalIsOpen: false });
    clearModalErrors();
  }

  handleUserCreation(e) {
    e.preventDefault();
    const { createUser } = this.props;
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
      () => this.setState({ modalIsOpen: false })
    );
  }

  render() {
    const {
      users: { isLoading, users, createErrors, modalLoading }
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="main">
        <section className="sales">
          <button type="button" className="btn btn--orange" id="show-user-modal" onClick={this.openModal}>
            Create User
          </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            shouldCloseOnEsc
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
          >
            <div className="form-body">
              <h3>Create New User</h3>
              <span role="link" className="form__closeBtn" onClick={this.closeModal}>
                &times;
              </span>
              <form id="create-user-form" onSubmit={this.handleUserCreation}>
                {createErrors.length ? <ErrorToast errors={createErrors} /> : null}
                <div className="input-group">
                  <label htmlFor="staff-name">Employee Name</label>
                  <input type="text" id="staff-name" required ref={staffName => (this.staffName = staffName)} />
                </div>
                <div className="input-group">
                  <label htmlFor="staff-email">Employee Email:</label>
                  <input type="email" id="staff-email" required ref={staffEmail => (this.staffEmail = staffEmail)} />
                </div>
                <div className="input-group">
                  <label htmlFor="staff-password">Employee Password:</label>
                  <input
                    type="password"
                    id="staff-password"
                    required
                    ref={staffPassword => (this.staffPassword = staffPassword)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="staff-role">Select Role:</label>
                  <select id="staff-role" ref={staffRole => (this.staffRole = staffRole)}>
                    <option value="Attendant">Attendant</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="input-group">
                  <button type="submit" disabled={modalLoading ? true : null} className="btn btn--gradient full-width">
                    {modalLoading ? <Spinner /> : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="table-wrapper no-flow">
            <table id="users-table" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td data-id={user.id}>
                      <button type="button" className="blue">
                        Update
                      </button>
                      <button type="button" className="red">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  users: state.users
});

const mapActionsToProp = {
  getUsers: usersActions.getUsers,
  createUser: usersActions.createUser,
  clearModalErrors: usersActions.clearModalErrors
};

export default connect(
  mapStateToProp,
  mapActionsToProp
)(AccountContent);
