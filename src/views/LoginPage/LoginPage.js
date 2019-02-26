import React from 'react';
import Helmet from 'react-helmet';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/Header';
import DefaultLoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => (
  <>
    <DefaultHeader />
    <Helmet>
      <title>Login - Store Manager</title>
    </Helmet>
    <Main>
      <DefaultLoginForm />
    </Main>
    <Footer />
  </>
);

export default LoginPage;
