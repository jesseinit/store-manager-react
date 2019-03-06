import React from 'react';
import Helmet from 'react-helmet';

import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ProductsPane from '../../components/ProductsPane/ProductsPane';

const ProductSettingsPage = () => {
  return (
    <>
      <DefaultHeader />
      <Helmet>
        <title>Product Settings - Store Manager</title>
      </Helmet>
      <Main>
        <SideNavigation />
        <ProductsPane />
      </Main>
      <Footer />
    </>
  );
};

export default ProductSettingsPage;
