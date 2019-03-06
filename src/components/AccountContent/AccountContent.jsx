import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import * as usersActions from '../../actions/usersActions/usersActions';
import Loading from '../Loading/Loading';
import UpdateUserModal from '../Modals/UpdateUserModal';
import Toasts from '../Toasts/Toasts';
import AccountRow from '../AccountRow/AccountRow';
import CreateUserModal from '../Modals/CreateUserModal';
import DeleteModal from '../Modals/DeleteModal';

export class AccountContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      setCreateModalOpen: false,
      updateModalIsOpen: false,
      deleteModalIsOpen: false
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
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
      users: { modalErrors }
    } = this.props;
    this.setState({ setCreateModalOpen: false, updateModalIsOpen: false, deleteModalIsOpen: false });
    if (modalErrors.length) clearModalErrors();
  };

  render() {
    const {
      users: { isLoading, users, modalErrors, modalLoading, actionMessage },
      updateUser,
      deleteUser,
      clearModalErrors
    } = this.props;

    const { modalIsOpen, updateModalIsOpen, userData, deleteModalIsOpen } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="main">
        <section className="sales">
          <button type="button" className="btn btn--gradient" id="show-user-modal" onClick={this.openModal}>
            Create User
          </button>

          <ToastProvider placement="top-center" transitionDuration={300} autoDismissTimeout={3000}>
            <Toasts content={actionMessage || null} />
          </ToastProvider>

          <CreateUserModal
            modalOpenState={this.state.setCreateModalOpen}
            closeModal={this.closeModal}
            modalErrors={modalErrors}
            modalLoading={modalLoading}
            {...this.props}
          />

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
                  <AccountRow
                    key={user.id}
                    user={user}
                    modalState={modalIsOpen}
                    openUpdateModal={this.openUpdateModal}
                    openDeleteModal={this.openDeleteModal}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <UpdateUserModal
            modalState={updateModalIsOpen}
            user={userData}
            closeModal={this.closeModal}
            updateUser={updateUser}
            modalErrors={modalErrors}
            clearModalErrors={clearModalErrors}
            modalLoading={modalLoading}
          />
          <DeleteModal
            modalState={deleteModalIsOpen}
            user={userData}
            closeModal={this.closeModal}
            deleteUser={deleteUser}
            modalErrors={modalErrors}
            clearModalErrors={clearModalErrors}
            modalLoading={modalLoading}
          />
        </section>
      </div>
    );
  }
}

AccountContent.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  clearModalErrors: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  users: state.users
});

const mapActionsToProp = {
  getUsers: usersActions.getUsers,
  createUser: usersActions.createUser,
  clearModalErrors: usersActions.clearModalErrors,
  updateUser: usersActions.updateUser,
  deleteUser: usersActions.deleteUser
};

export default connect(
  mapStateToProp,
  mapActionsToProp
)(AccountContent);
