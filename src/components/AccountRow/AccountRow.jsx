import React from 'react';

const AccountRow = ({ user, modalState, openUpdateModal, closeModal }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td data-id={user.id}>
        <button type="button" className="blue" onClick={() => openUpdateModal(user)}>
          Update
        </button>
        <button type="button" id="update-user" className="red">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AccountRow;
