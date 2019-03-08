import React from 'react';
import Helmet from 'react-helmet';
import DefaultHeader from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import MySalesPane from '../../components/MySalesPane/MySalesPane';

const MySalesPage = () => (
  <>
    <DefaultHeader />
    <Helmet>
      <title>My Sales - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <MySalesPane />
    </Main>
    <Footer />
  </>
);

export default MySalesPage;
