import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../views/LoginPage/LoginPage';
import NotFound from '../components/NotFound/NotFound';
import Dashboard from '../views/DashboardPage/DashboardPage';
import AdminRoutesHOC from '../containers/AdminRoutes';
import AttendantRoutesHOC from '../containers/AttendantRoutes';
import Accounts from '../views/AccountsPage/AccountsPage';
import MakeSalePage from '../views/MakeSalePage/MakeSalePage';
import ProductSettingsPage from '../views/ProductSettingsPage/ProductSettingsPage';

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <AdminRoutesHOC exact path="/dashboard" component={Dashboard} />
        <AdminRoutesHOC exact path="/staff-accounts" component={Accounts} />
        <AdminRoutesHOC exact path="/product-settings" component={ProductSettingsPage} />
        <AttendantRoutesHOC exact path="/make-sale" component={MakeSalePage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </>
);

export default Routes;
