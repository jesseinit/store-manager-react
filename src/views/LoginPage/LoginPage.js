import React from 'react';
import Helmet from 'react-helmet';
import Main from '../../components/Main/Main';
import DefaultLoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => (
  <>
    <Helmet>
      <title>Login - Store Manager</title>
    </Helmet>
    <Main>
      <DefaultLoginForm />
    </Main>
  </>
);

export default LoginPage;
