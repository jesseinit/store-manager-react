import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './LoginForm.scss';

import ErrorToast from '../ErrorToast/ErrorToast';
import * as authActions from '../../actions/authActions/authActions';
import Spinner from '../Spinner/Spinner';

export class LoginForm extends Component {
  loginUser = e => {
    e.preventDefault();
    const { loginUser } = this.props;

    const email = this.email.value;
    const password = this.password.value;

    loginUser({ email, password });
  };

  clearErrors = () => {
    const {
      auth: { loginErrors },
      clearLoginErrors
    } = this.props;
    if (loginErrors.length) clearLoginErrors();
  };

  render() {
    const {
      auth: { isAuthenticated, userRole, isLoading, loginErrors }
    } = this.props;

    if (isAuthenticated) {
      if (userRole === 'Attendant') {
        return <Redirect to="/make-sale" />;
      }
      return <Redirect to="/dashboard" />;
    }

    return (
      <section className="form__wrapper">
        <div className="form">
          <p className="form__header">Login with your account.</p>
          <form id="login-form" className="form__login" onSubmit={this.loginUser}>
            {loginErrors.length ? <ErrorToast errors={loginErrors} /> : null}
            <div className="form__control">
              <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="email"
                id="login-email"
                className="form__input"
                placeholder="email@storemanager.com"
                required
                pattern="(^[A-Za-z]+)(\.[a-zA-Z]+)?@storemanager.com$"
                ref={email => (this.email = email)}
                onFocus={this.clearErrors}
              />
            </div>
            <div className="form__control">
              <input
                type="password"
                id="login-password"
                className="form__input"
                placeholder="Password"
                required
                ref={password => (this.password = password)}
                onFocus={this.clearErrors}
              />
            </div>
            <div className="form__control">
              <button
                onFocus={this.clearErrors}
                onClick={this.handleClick}
                type="submit"
                className="btn btn--gradient full-width"
                disabled={isLoading ? true : null}
              >
                {isLoading ? <Spinner /> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userRole: PropTypes.string,
    isLoading: PropTypes.bool,
    loginErrors: PropTypes.array
  }).isRequired,
  clearLoginErrors: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth
});

const mapActionsToProp = { loginUser: authActions.loginUser, clearLoginErrors: authActions.clearLoginErrors };

export default connect(
  mapStateToProp,
  mapActionsToProp
)(LoginForm);
