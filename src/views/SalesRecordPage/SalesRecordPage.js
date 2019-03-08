import React from 'react';
import Helmet from 'react-helmet';

import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import SalesRecordPane from '../../components/SalesRecordPane/SalesRecordPane';

const SalesRecordPage = () => {
  return (
    <>
      <DefaultHeader />
      <Helmet>
        <title>Sales Record - Store Manager</title>
      </Helmet>
      <Main>
        <SideNavigation />
        <SalesRecordPane />
      </Main>
      <Footer />
    </>
  );
};

export default SalesRecordPage;
