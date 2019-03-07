import React from 'react';
import PropTypes from 'prop-types';

const AccountRow = ({ user, openUpdateModal, openDeleteModal }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td data-id={user.id}>
        <button type="button" id="update-user" className="blue" onClick={() => openUpdateModal(user)}>
          Update
        </button>
        {user.role === 'Owner' ? null : (
          <button type="button" id="delete-user" className="red" onClick={() => openDeleteModal(user)}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

AccountRow.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  openUpdateModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired
};

export default AccountRow;
