import React from 'react';
import Helmet from 'react-helmet';

import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import CategoryPane from '../../components/CategoryPane/CategoryPane';

const CategorySettingsPage = () => (
  <>
    <DefaultHeader />
    <Helmet>
      <title>Category Settings - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <CategoryPane />
    </Main>
    <Footer />
  </>
);

export default CategorySettingsPage;
