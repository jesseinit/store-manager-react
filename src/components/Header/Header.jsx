import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../../actions/authActions/authActions';
import './Header.scss';
import CartButton from '../CartButton/CartButton';

export const Header = ({ auth: { userRole }, logOutUser, cart }) => {
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
        <CartButton cart={cart} />
        <LogoutBtn logOutUser={logOut} />
      </>
    )
  };

  const menuItems = navLinks[userRole];

  return (
    <header id="site-header" className="row">
      <a className="logo" href="./">
        <img
          className="logoImage"
          src="https://res.cloudinary.com/jesseinit/image/upload/v1551386309/store/smLogo.svg"
          alt="logo"
        />
        <p className="logoText">Store Manager</p>
      </a>
      <nav className="top-nav">
        <ul>{menuItems}</ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.shape({
    userRole: PropTypes.string,
    isAuthenticated: PropTypes.bool
  }),
  logOutUser: PropTypes.func.isRequired,
  cart: PropTypes.oneOfType([PropTypes.object])
};

Header.defaultProps = {
  auth: {
    userRole: '',
    isAuthenticated: false
  },
  cart: {
    cartItems: []
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

const mapActionToProps = { logOutUser: authActions.logOutUser };

export default connect(
  mapStateToProps,
  mapActionToProps
)(Header);
