import React from 'react';
import Helmet from 'react-helmet';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => (
  <>
    <Header />
    <Helmet>
      <title>Login - Store Manager</title>
    </Helmet>
    <Main>
      <LoginForm />
    </Main>
    <Footer />
  </>
);

export default LoginPage;
