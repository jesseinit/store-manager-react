import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './SideNavigation.scss';

const SideNavigation = props => {
  const sideNavLinks = {
    attendantView: [{ navText: 'Make Sale', navLink: './make-sale' }, { navText: 'My Sales', navLink: './my-sales' }],
    adminView: [
      { navText: 'Admin Dashboard', navLink: './dashboard' },
      { navText: 'Staff Accounts', navLink: './staff-accounts' },
      { navText: 'Product Settings', navLink: './product-settings' },
      { navText: 'Category Settings', navLink: './category-settings' },
      { navText: 'Sales Records', navLink: './sales-record' }
    ]
  };

  const {
    auth: { userRole }
  } = props;

  const navLinks =
    userRole === 'Attendant'
      ? sideNavLinks.attendantView.map((link, index) => {
          return (
            <li key={index}>
              <NavLink to={link.navLink.slice(1)} activeClassName="selected">
                {link.navText}
              </NavLink>
            </li>
          );
        })
      : sideNavLinks.adminView.map((link, index) => {
          return (
            <li key={index}>
              <NavLink to={link.navLink.slice(1)} activeClassName="selected">
                {link.navText}
              </NavLink>
            </li>
          );
        });

  return (
    <aside className="aside">
      <nav className="aside__nav admin">
        <ul>{navLinks}</ul>
      </nav>
    </aside>
  );
};

SideNavigation.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp)(SideNavigation);
