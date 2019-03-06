import React from 'react';
import Helmet from 'react-helmet';

import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ProductsCatalog from '../../components/ProductsCatalog/ProductsCatalog';

const MakeSalePage = () => (
  <>
    <DefaultHeader />
    <Helmet>
      <title>Make Sale - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <ProductsCatalog />
    </Main>
    <Footer />
  </>
);

export default MakeSalePage;
