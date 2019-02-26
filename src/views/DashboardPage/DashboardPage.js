import React from 'react';
import Helmet from 'react-helmet';
import HeaderDefault from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import DashboardContent from '../../components/Dashboard/Dashboard';

const Dashboard = () => (
  <>
    <HeaderDefault />
    <Helmet>
      <title>Dashboard - Store Manager</title>
    </Helmet>
    <Main>
      <SideNavigation />
      <DashboardContent />
    </Main>
    <Footer />
  </>
);

export default Dashboard;
