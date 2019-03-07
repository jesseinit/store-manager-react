import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const AttendantRoute = ({ component: Component, isAuthenticated, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated && userRole === 'Attendant') {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

AttendantRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userRole: PropTypes.string
};

AttendantRoute.defaultProps = {
  component: null,
  isAuthenticated: false,
  userRole: ''
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.userRole
});

export default connect(mapStateToProps)(AttendantRoute);
