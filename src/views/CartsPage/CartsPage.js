import React from 'react';
import Helmet from 'react-helmet';

import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import CartGridView from '../../components/CartGridView/CartGridView';

const CartsPage = () => (
  <>
    <DefaultHeader />
    <Helmet>
      <title>Make Sale - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <CartGridView />
    </Main>
    <Footer />
  </>
);

export default CartsPage;
