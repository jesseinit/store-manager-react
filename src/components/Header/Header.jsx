import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../../actions/authActions';
import './Header.scss';
import CartButton from '../CartButton/CartButton';

export const Header = ({ auth: { userRole }, logOutUser }) => {
  const logOut = e => {
    e.preventDefault();
    logOutUser();
  };

  const LogoutBtn = () => {
    return (
      <li>
        <a onClick={logOut} id="logout-btn" href="/">
          Logout
        </a>
      </li>
    );
  };

  const navLinks = {
    Owner: <LogoutBtn logOutUser={logOut} />,
    Admin: <LogoutBtn logOutUser={logOut} />,
    Attendant: (
      <>
        <CartButton />
        <LogoutBtn logOutUser={logOut} />
      </>
    )
  };

  const menuItems = navLinks[userRole];

  return (
    <header id="site-header" className="row">
      <a className="logo" href="./">
        Store Manager
      </a>
      <nav className="top-nav">
        <ul>{menuItems}</ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.shape({
    userRole: PropTypes.string
  }),
  logOutUser: PropTypes.func.isRequired
};

Header.defaultProps = {
  auth: {
    userRole: ''
  }
};

const mapActionToProps = { logOutUser: authActions.logOutUser };

export default connect(
  null,
  mapActionToProps
)(Header);
