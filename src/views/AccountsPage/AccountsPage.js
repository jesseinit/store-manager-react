import React from 'react';
import Helmet from 'react-helmet';
import HeaderDefault from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import AccountContentDefault from '../../components/AccountContent/AccountContent';

const Accounts = () => (
  <>
    <HeaderDefault />
    <Helmet>
      <title>Account Settings - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <AccountContentDefault />
    </Main>
    <Footer />
  </>
);

export default Accounts;
